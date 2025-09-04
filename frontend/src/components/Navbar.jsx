import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/reservations", label: "Reservations" },
    { to: "/about", label: "About" },
    { to: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur border-b border-[#333]">
      <div className="container mx-auto flex justify-between items-center py-6 px-6">
        {/* Logo + Brand (both link home) */}
        <Link to="/" className="flex items-center gap-4">
          {/* Animated Logo */}
          <motion.img
            src="/images/new-cafe-fausse.webp"
            alt="Café Fausse Logo"
            className="h-16 w-16 object-contain"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />

          {/* Brand text + slogan */}
          <div className="flex flex-col leading-tight">
            <motion.h1
              className="text-4xl font-serif font-bold text-[#d4af37] tracking-wide"
              animate={{ opacity: [1, 0.8, 1], y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              Café Fausse
            </motion.h1>

            {/* Animated slogan */}
            <motion.span
              className="text-white text-sm italic font-[cursive]"
              animate={{ opacity: [0.6, 1, 0.6], y: [0, -1, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              Espresso Yourself
            </motion.span>
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-10 text-white font-medium text-lg">
          {links.map((link) => (
            <motion.li 
              key={link.to} 
              className="relative group"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <Link
                to={link.to}
                className="hover:text-[#d4af37] transition-colors"
              >
                {link.label}
              </Link>
              {/* Animated underline */}
              <motion.span
                variants={{
                  rest: { width: 0 },
                  hover: { width: "100%" }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute left-0 -bottom-1 h-[2px] bg-[#d4af37]"
              />
            </motion.li>
          ))}
        </ul>


        {/* Mobile hamburger */}
        <button
          className="md:hidden text-3xl text-[#d4af37] focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-2/3 bg-black z-50 shadow-lg p-8 md:hidden"
          >
            <ul className="flex flex-col gap-6 text-white text-lg">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
