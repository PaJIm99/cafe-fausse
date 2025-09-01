# Café Fausse Web Application
A React + Flask + PostgreSQL application that implements:
- Five pages (Home, Menu, Reservations, About, Gallery) with responsive UI.
- A reservations system backed by PostgreSQL with 30 tables per timeslot, 
availability checks, and random table assignment.
- Newsletter email signup with validation and storage.
## Tech Stack
- Frontend: React (Vite), React Router, CSS Grid/Flexbox
- Backend: Flask, SQLAlchemy, psycopg2, Flask-CORS
- DB: PostgreSQL
## Quick Start
### 1) Prerequisites
- Node 18+
- Python 3.10+
- PostgreSQL 14+
### 2) Environment
Copy `.env.example` to `.env` and fill in values.
### 3) Database
Create DB and schema:
```bash
createdb cafe_fausse
psql cafe_fausse -f backend/sql/ddl.sql
psql cafe_fausse -f backend/sql/seed.sql # optional