const BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5000/api';

// Utility to normalize datetime into strict ISO format (without ms, with T)
function normalizeIso(datetime) {
  return new Date(datetime).toISOString().split('.')[0];
}

export async function getAvailability(timeSlotIso) {
  const iso = normalizeIso(timeSlotIso);
  const res = await fetch(
    `${BASE}/availability?time_slot=${encodeURIComponent(iso)}`
  );
  if (!res.ok) throw new Error('Failed to fetch availability');
  return res.json();
}

export async function createReservation(payload) {
  const fixedPayload = {
    ...payload,
    time_slot: normalizeIso(payload.time_slot),
  };

  const res = await fetch(`${BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fixedPayload),
  });

  return res.json();
}

// export async function signupNewsletter(payload) {
//   const res = await fetch(`${BASE}/newsletter`, {
//     method: 'POST',s
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });
//   return res.json();
// }

export async function subscribeNewsletter({ name, email }) {
  const res = await fetch('http://localhost:5000/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });

  if (!res.ok) {
    const data = await res.json();
    return { ok: false, error: data.error || 'Unknown error' };
  }

  return await res.json(); // should return { ok: true } or { ok: false, error: "..." }
}

export async function checkNewsletter(email) {
  try {
    const res = await fetch(`/api/newsletter/check?email=${encodeURIComponent(email)}`);
    return await res.json();
  } catch {
    return { ok: false, subscribed: false };
  }
}

