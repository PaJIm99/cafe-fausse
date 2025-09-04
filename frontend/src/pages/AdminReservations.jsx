import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";

const ADMIN_PASSWORD = "fausse2025"; // change or move to env variable in production

export default function AdminReservations() {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (authed) {
      fetch("http://127.0.0.1:5000/api/admin/reservations")
        .then((r) => r.json())
        .then(setData);
    }
  }, [authed]);

  if (!authed) {
    return (
      <div className="pt-28">
        <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Hero
            image="/images/hero-admin.webp"
            title="Admin Access"
            subtitle="Manage reservations securely."
          />
        </motion.div>

        <motion.div
          className="card max-w-md mx-auto mt-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-3">Login</h2>
          <p>Enter password to view reservations:</p>
          <input
            className="input mt-2"
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="button mt-4"
            onClick={() => {
              if (input === ADMIN_PASSWORD) {
                setAuthed(true);
              } else {
                alert("Invalid password");
              }
            }}
          >
            Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <Hero
          image="/images/hero-admin.webp"
          title="Reservations Dashboard"
          subtitle="Overview of all customer bookings"
        />
      </motion.div>

      <motion.div
        className="card mt-6 overflow-x-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4">All Reservations</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Time</th>
              <th className="p-2">Guests</th>
              <th className="p-2">Table</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-gray-700"
              >
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.customer.name}</td>
                <td className="p-2">{r.customer.email}</td>
                <td className="p-2">{new Date(r.time_slot).toLocaleString()}</td>
                <td className="p-2">{r.guests}</td>
                <td className="p-2">{r.table_number}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
