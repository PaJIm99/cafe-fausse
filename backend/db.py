import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, pool_pre_ping=True, future=True)
SessionLocal = scoped_session(sessionmaker(bind=engine, autoflush=False, 
autocommit=False, future=True))
def get_db():
 db = SessionLocal() 
 try:
    yield db
 finally:
    db.close()