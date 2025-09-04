import React from "react";
import { motion } from "framer-motion";
import ReservationForm from "../components/ReservationForm";
import Card from "../components/Card";
import Hero from "../components/Hero";

export default function Reservations() {
  return (
    <div className="pt-28"> {/* Push content below navbar */}
      {/* Hero banner with animation */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hero
          image="/images/hero-dining-elegant.webp"
          title="Reserve Your Table"
          subtitle="Secure your place for an unforgettable evening at Café Fausse."
        />
      </motion.div>

      {/* Page content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 mt-10">
        {/* Reservation form card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card>
            <h2 className="text-xl font-semibold mb-4">Book a Table</h2>
            <ReservationForm />
          </Card>
        </motion.div>

        {/* Why reserve card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card>
            <h3 className="text-lg font-semibold mb-3">Why Reserve Online?</h3>
            <p className="text-white-600 leading-relaxed">
              Secure your table instantly, avoid waiting, and ensure the perfect evening at Café Fausse.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
