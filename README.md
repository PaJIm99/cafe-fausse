# Café Fausse Web Application

A complete restaurant web app built with **React (Vite)** frontend and **Flask + PostgreSQL** backend.  

# Features
- 5 required pages (Home, Menu, Reservations, About, Gallery)  
- Responsive UI with Grid/Flexbox  
- Reservation system with 30 tables per timeslot  
- Newsletter signup with email validation  
- Admin endpoint for viewing reservations  
- AI-assisted development (see below)

## Tech Stack
- Frontend: React, React Router, react-datepicker, CSS Grid/Flexbox  
- Backend: Flask, SQLAlchemy, psycopg2, Flask-CORS  
- Database: PostgreSQL  

## Running Locally

### 1. Prerequisites
- Node.js 18+  
- Python 3.10+  
- PostgreSQL 14+  

### 2. Clone repo
bash
git clone https://github.com/PaJIm99/cafe-fausse.git
cd cafe-fausse

### 3. Environment setup
cp .env.example .env   # edit DB connection details

### 4. Backend
cd backend
python -m venv .venv
source .venv/bin/activate   # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
flask run

### 5. Frontend
cd frontend
npm install
npm run dev
App runs at:

Frontend: http://localhost:5173

Backend: http://localhost:5000

#### AI Tooling Used
I used ChatGPT (OpenAI GPT-5) as an AI code generation assistant throughout development.
Examples of usage:

1) Generated initial Flask endpoints (/api/reservations, /api/newsletter).

2) Helped design SQLAlchemy models and DB schema.

3) Wrote React components (ReservationForm, NewsletterForm, Hero, etc.).

4) Assisted in debugging async vs sync issues (pick_table coroutine bug).

5) Suggested UI/UX improvements like inline validation, success/error messages, and consistent navigation.

6) All generated code was reviewed, tested, and adjusted by me.

7) The AI acted as a pair programmer to speed up development and improve quality.

#### Repo updates
# Stage everything (modified + new files)
***from root project folder**
git add .

# Commit with a clear message
git commit -m "Commit Text"

# Push to GitHub
git push origin main