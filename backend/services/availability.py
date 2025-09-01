import random
from sqlalchemy import select, func
from models import Reservation

TOTAL_TABLES = 30

def pick_table(db, time_slot):
    # Find taken tables for this timeslot
    rows = db.execute(
        select(Reservation.table_number).where(Reservation.time_slot == time_slot)
    ).scalars().all()
    taken = set(rows)
    free = [t for t in range(1, TOTAL_TABLES + 1) if t not in taken]
    if not free:
        return None
    return random.choice(free)

def count_available(db, time_slot):
    count = db.execute(
        select(func.count()).select_from(Reservation).where(Reservation.time_slot == time_slot)
    ).scalar_one()
    return max(0, TOTAL_TABLES - count)
