import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "../components/Lightbox";

const images = [
  { src: "/images/gallery-cafe-interior.webp", alt: "Cafe interior" },
  { src: "/images/gallery-ribeye-steak.webp", alt: "Ribeye steak" },
  { src: "/images/gallery-special-event.webp", alt: "Special event" },
  { src: "/images/gallery-bistro.webp", alt: "Luxury bistro" },
  { src: "/images/gallery-dining-room.webp", alt: "Elegant dining room" },
  { src: "/images/hero-dining-elegant.webp", alt: "Elegant dining room" },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);

  // Auto-scroll every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-28"> {/* 🔹 pushes content down from navbar */}
      {/* Auto-scrolling carousel */}
      <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-lg my-6">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current].src}
            alt={images[current].alt}
            className="w-full h-full object-cover cursor-pointer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() =>
              Lightbox.open(images.map((i) => i.src), current)
            }
          />
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === current ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Awards & Reviews with animation */}
      <motion.div
        className="card mt-6 p-4 rounded-xl shadow-lg bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold mb-3">🏆 Awards & Reviews</h3>
        <ul className="list-disc list-inside space-y-1">
          <motion.li initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            Culinary Excellence Award – 2022
          </motion.li>
          <motion.li initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            Restaurant of the Year – 2023
          </motion.li>
          <motion.li initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            Best Fine Dining Experience – Foodie Magazine, 2023
          </motion.li>
        </ul>

        <motion.blockquote
          className="text-gray-500 italic mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          “Exceptional ambiance and unforgettable flavors.” – Gourmet Review
        </motion.blockquote>
        <motion.blockquote
          className="text-gray-500 italic mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          “A must-visit restaurant for food enthusiasts.” – The Daily Bite
        </motion.blockquote>
      </motion.div>
    </div>
  );
}
