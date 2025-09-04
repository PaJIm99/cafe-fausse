import random
from datetime import timedelta
from sqlalchemy import select, func
from models import Reservation

TOTAL_TABLES = 30

def pick_table(db, time_slot):
    # 1-hour booking window
    end = time_slot + timedelta(hours=1)

    rows = db.execute(
        select(Reservation.table_number)
        .where(Reservation.time_slot >= time_slot)
        .where(Reservation.time_slot < end)
    ).scalars().all()

    taken = set(rows)
    free = [t for t in range(1, TOTAL_TABLES + 1) if t not in taken]
    return random.choice(free) if free else None

def count_available(db, time_slot):
    # 1-hour booking window
    end = time_slot + timedelta(hours=1)

    count = db.execute(
        select(func.count())
        .select_from(Reservation)
        .where(Reservation.time_slot >= time_slot)
        .where(Reservation.time_slot < end)
    ).scalar_one()

    return max(0, TOTAL_TABLES - count)
