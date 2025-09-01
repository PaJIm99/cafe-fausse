from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import declarative_base, relationship
Base = declarative_base()
class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    phone = Column(String(32))
    newsletter = Column(Boolean, nullable=False, default=False)
    reservations = relationship("Reservation", back_populates="customer")
class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    time_slot = Column(DateTime, nullable=False)
    table_number = Column(Integer, nullable=False)
    guests = Column(Integer, nullable=False)
    customer = relationship("Customer", back_populates="reservations")
    __table_args__ = (
    UniqueConstraint("time_slot", "table_number", name="uq_slot_table"),
    )
class Newsletter(Base):
    __tablename__ = "newsletter"
    id = Column(Integer, primary_key=True)
    email = Column(String(255), nullable=False, unique=True)
    name = Column(String(120))