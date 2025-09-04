import React from "react";
import { motion } from "framer-motion";
import ReservationForm from "../components/ReservationForm";
import NewsletterSignup from "../components/NewsletterSignup";
import Hero from "../components/Hero";
import Card from "../components/Card";

export default function Home() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Hero
          image="/images/home-cafe-fausse.webp"
          title="Refined Italian Cuisine"
          subtitle="Experience Café Fausse, where tradition meets modern elegance."
        />
      </motion.div>

      {/* About Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 mt-10">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <Card>
            <h3>
              Café Fausse began with a passion for authentic Italian flavors and a dream of creating a cozy, elegant dining space. Our founders traveled through Italy, gathering recipes and inspiration to bring a true taste of Italy to our city.
            </h3>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
          <Card>
            <h3>Our Specialties</h3>
            <p>
              We specialize in handcrafted pasta, wood-fired pizzas, and a curated selection of Italian wines. Our signature dish, the "Fausse Carbonara," is a must-try for any visitor.
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Gallery */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {["menu-drinks.webp", "gallery-ribeye-steak.webp", "gallery-bistro.webp"].map((img, i) => (
          <motion.img
            key={i}
            src={`/images/${img}`}
            alt={img}
            className="img"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>


      {/* Newsletter */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <Card className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">Join our newsletter</h2>
          <NewsletterSignup />
        </Card>
      </motion.div>

      {/* Reservation Form */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
        <Card className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Reserve Your Table</h2>
          <ReservationForm />
        </Card>
      </motion.div>
    </div>
  );
}
