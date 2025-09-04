import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 pt-28">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-[var(--gold)] mb-4">Our Story</h2>
        <p className="text-lg leading-relaxed">
          Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez,
          Café Fausse blends traditional Italian flavors with modern culinary innovation.
          Our mission is to deliver an unforgettable dining experience shaped by craft,
          creativity, and locally sourced ingredients.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <strong>Chef Antonio Rossi</strong>
            <p className="text-[var(--muted)]">Executive Chef & Co-Founder</p>
          </motion.div>
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <strong>Maria Lopez</strong>
            <p className="text-[var(--muted)]">Restaurateur & Co-Founder</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.img
        src="/images/gallery-dining-room.webp"
        alt="Elegant dining room"
        className="img"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      />
    </div>
  );
}
