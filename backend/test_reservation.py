import requests
from datetime import datetime, timedelta

BASE = "http://127.0.0.1:5000/api"

# pick a time slot in the future
time_slot = (datetime.now() + timedelta(days=1, hours=2)).strftime("%Y-%m-%d %H:%M:%S")

payload = {
    "name": "Test User",
    "email": "testuser@example.com",
    "phone": "+1234567890",
    "newsletter": True,
    "guests": 2,
    "time_slot": time_slot,
}

print("Sending payload:", payload)

res = requests.post(f"{BASE}/reservations", json=payload)

print("Status code:", res.status_code)
try:
    print("Response:", res.json())
except Exception:
    print("Raw response:", res.text)
