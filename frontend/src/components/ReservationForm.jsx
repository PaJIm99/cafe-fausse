import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createReservation, getAvailability } from "../api/client";
import "../styles/datepicker.css";

export default function ReservationForm({ compact = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState(new Date(Date.now() + 2 * 3600 * 1000));
  const [availability, setAvailability] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const iso = time.toISOString();
    getAvailability(iso)
      .then(setAvailability)
      .catch(() => setAvailability(null));
  }, [time]);

  async function onSubmit(e) {
    e.preventDefault();
    const payload = {
      name,
      email,
      phone,
      newsletter,
      guests: Number(guests),
      time_slot: time.toISOString(),
    };

    const res = await createReservation(payload);

    if (res.ok) {
      setStatus(
        `Reserved! Table ${res.table_number} at ${new Date(
          res.time_slot
        ).toLocaleString()}.`
      );
    } else {
      setStatus(res.error || "Could not complete reservation.");
    }

    const iso = time.toISOString();
    getAvailability(iso).then(setAvailability).catch(() => {});
  }

  return (
    <form onSubmit={onSubmit} className="reservation-form">
      <label className="label">Time *</label>
      <div className="datepicker-container">
        <DatePicker
          className="datepicker-input"
          selected={time}
          onChange={(date) => setTime(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>

      <label className="label">Guests *</label>
      <input
        className="input"
        type="number"
        min="1"
        max="8"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />

      {!compact && (
        <>
          <label className="label">Name *</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
          />

          <label className="label">Email *</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label className="label">Phone (optional)</label>
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 202 555 0123"
          />

          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
              />{" "}
              Join newsletter
            </label>
          </div>
        </>
      )}

      <div className="button-container">
        <button className="button">Reserve</button>
      </div>

      {status && <p className="status-message">{status}</p>}

      {!compact && availability && (
        <p className="availability-info">
          Tables available: {availability.available} / {availability.total}
        </p>
      )}
    </form>
  );
}