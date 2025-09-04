import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createReservation,
  getAvailability,
  checkNewsletter,
} from "../api/client";
import "../styles/datepicker.css";

export default function ReservationForm({ compact = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newsletter, setNewsletter] = useState(false); // default unchecked
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState(new Date(Date.now() + 2 * 3600 * 1000));
  const [availability, setAvailability] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterValidated, setNewsletterValidated] = useState(true); 
  const [checkingNewsletter, setCheckingNewsletter] = useState(false); 

  // Fetch availability whenever time changes
  useEffect(() => {
    const iso = time.toISOString();
    getAvailability(iso)
      .then(setAvailability)
      .catch(() => setAvailability(null));
  }, [time]);

  // Validate inputs
  function validate() {
    if (!name.trim()) return "Name is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return "Valid email required.";
    if (guests < 1 || guests > 8) return "Guests must be between 1 and 8.";
    return null;
  }

  // Check newsletter subscription whenever email or checkbox changes
  useEffect(() => {
    if (newsletter && email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setCheckingNewsletter(true);
      setNewsletterValidated(false);

      checkNewsletter(email).then((res) => {
        if (res.ok && res.subscribed) {
          setSubscribed(true);
          setNewsletter(false); // auto-uncheck
          setError("⚠️ This email is already subscribed to the newsletter.");
        } else {
          setSubscribed(false);
        }
        setNewsletterValidated(true);
        setCheckingNewsletter(false);
      });
    } else {
      setNewsletterValidated(true);
      setCheckingNewsletter(false);
    }
  }, [newsletter, email]);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setStatus(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (newsletter && !newsletterValidated) {
      setError("Checking newsletter subscription... please wait.");
      return;
    }

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
        `✅ Reserved! Table ${res.table_number} at ${new Date(
          res.time_slot
        ).toLocaleString()}.`
      );
      setName("");
      setEmail("");
      setPhone("");
      setGuests(2);
      setNewsletter(false); 
      setSubscribed(false);
    } else {
      setError(res.error || "❌ Could not complete reservation.");
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
          timeIntervals={30}
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
              {subscribed ? "Already subscribed" : "Join newsletter"}
            </label>
          </div>
        </>
      )}

      <div className="button-container">
        <button className="button" disabled={checkingNewsletter}>
          {checkingNewsletter ? (
            <span className="flex items-center gap-2">
              <span className="loader"></span> Checking...
            </span>
          ) : (
            "Reserve"
          )}
        </button>
      </div>

      {error && (
        <p className="status-message" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {status && (
        <p className="status-message" style={{ color: "green" }}>
          {status}
        </p>
      )}

      {!compact && availability && (
        <p className="availability-info">
          Tables available: {availability.available} / {availability.total}
        </p>
      )}
    </form>
  );
}
