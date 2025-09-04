import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 800); // show for 0.8s
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999]"
        >
          <img
            src="/images/new-cafe-fausse.webp"
            alt="Café Fausse"
            className="h-32 w-32 drop-shadow-lg"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
