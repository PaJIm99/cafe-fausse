import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ images }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`gallery-${i}`}
            className="cursor-pointer rounded-lg hover:opacity-80 transition"
            onClick={() => setSelected(img)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="relative">
              <img
                src={selected}
                alt="enlarged"
                className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full px-3 py-1 hover:bg-black/70"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
