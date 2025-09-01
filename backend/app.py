import os
import re
from datetime import datetime
from contextlib import contextmanager
from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from db import get_db, engine
from models import Base, Customer, Reservation, Newsletter
from services.availability import pick_table, count_available

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": os.getenv("ALLOWED_ORIGINS", "*")}})

# Create tables if not exists
with engine.begin() as conn:
    Base.metadata.create_all(bind=conn)

email_regex = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


@contextmanager
def session_scope():
    from db import SessionLocal
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except:
        db.rollback()
        raise
    finally:
        db.close()


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/availability")
def availability():
    iso = request.args.get("time_slot")
    if not iso:
        return jsonify({"error": "Missing time_slot"}), 400
    try:
        iso = iso.replace(" ", "T", 1)  # normalize
        time_slot = datetime.fromisoformat(iso)
    except Exception:
        return jsonify({"error": "Invalid time_slot"}), 400

    with session_scope() as db:
        avail = count_available(db, time_slot)
        return {"time_slot": time_slot.isoformat(), "available": avail, "total": 30}


@app.post("/api/newsletter")
def newsletter_signup():
    data = request.get_json(force=True)
    email = (data.get("email") or "").strip().lower()
    name = (data.get("name") or "").strip()
    if not email_regex.match(email):
        return jsonify({"error": "Invalid email"}), 400
    with session_scope() as db:
        existing = db.execute(
            select(Newsletter).where(Newsletter.email == email)
        ).scalar_one_or_none()
        if existing is None:
            db.add(Newsletter(email=email, name=name))
        return {"ok": True}


@app.post("/api/reservations")
def create_reservation():
    data = request.get_json(force=True)
    try:
        name = data["name"].strip()
        email = data["email"].strip().lower()
        phone = data.get("phone")
        newsletter = bool(data.get("newsletter", False))
        guests = int(data.get("guests", 1))

        iso = data["time_slot"].replace(" ", "T", 1)
        time_slot = datetime.fromisoformat(iso)
    except Exception as e:
        return jsonify({"error": f"Invalid payload: {e}"}), 400

    if not name or not email_regex.match(email) or guests < 1:
        return jsonify({"error": "Validation failed"}), 400

    with session_scope() as db:
        # Ensure (or create) customer
        cust = db.execute(
            select(Customer).where(Customer.email == email)
        ).scalar_one_or_none()
        if cust is None:
            cust = Customer(name=name, email=email, phone=phone, newsletter=newsletter)
            db.add(cust)
            db.flush()
        else:
            cust.name = name
            cust.phone = phone or cust.phone
            cust.newsletter = cust.newsletter or newsletter

        # Pick a free table (sync now)
        table = pick_table(db, time_slot)
        if table is None:
            return jsonify(
                {"error": "Selected time slot is fully booked. Please pick another time."}
            ), 409

        booking = Reservation(
            customer_id=cust.id,
            time_slot=time_slot,
            table_number=table,
            guests=guests,
        )
        db.add(booking)
        try:
            db.flush()
        except IntegrityError:
            db.rollback()
            with session_scope() as db2:
                table2 = pick_table(db2, time_slot)
                if table2 is None:
                    return jsonify(
                        {"error": "Selected time slot is fully booked. Please pick another time."}
                    ), 409
                cust2 = db2.execute(
                    select(Customer).where(Customer.email == email)
                ).scalar_one()
                booking2 = Reservation(
                    customer_id=cust2.id,
                    time_slot=time_slot,
                    table_number=table2,
                    guests=guests,
                )
                db2.add(booking2)
                db2.flush()
                return {
                    "ok": True,
                    "reservation_id": booking2.id,
                    "table_number": table2,
                    "time_slot": time_slot.isoformat(),
                }

        return {
            "ok": True,
            "reservation_id": booking.id,
            "table_number": table,
            "time_slot": time_slot.isoformat(),
        }


@app.get("/api/admin/reservations")
def list_reservations():
    with session_scope() as db:
        rows = db.execute(select(Reservation)).scalars().all()
        return [
            {
                "id": r.id,
                "time_slot": r.time_slot.isoformat(),
                "table_number": r.table_number,
                "guests": r.guests,
                "customer": {
                    "name": r.customer.name,
                    "email": r.customer.email,
                    "phone": r.customer.phone,
                },
            }
            for r in rows
        ]


if __name__ == "__main__":
    app.run(debug=True)
