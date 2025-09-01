from dataclasses import dataclass
from datetime import datetime
@dataclass
class ReservationIn:
    name: str
    email: str
    phone: str | None
    newsletter: bool
    time_slot: datetime
    guests: int