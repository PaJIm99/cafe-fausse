import React from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Hero from "../components/Hero";

const sections = [
  {
    title: "Starters",
    image: "/images/menu-start.webp",
    items: [
      { name: "Bruschetta", desc: "Fresh tomatoes, basil, olive oil, toasted baguette", price: 8.5 },
      { name: "Caesar Salad", desc: "Crisp romaine with house Caesar dressing", price: 9.0 },
    ],
  },
  {
    title: "Main Courses",
    image: "/images/menu-main.webp",
    items: [
      { name: "Grilled Salmon", desc: "Lemon butter, seasonal vegetables", price: 22.0 },
      { name: "Ribeye Steak", desc: "12 oz, garlic mashed potatoes", price: 28.0 },
      { name: "Vegetable Risotto", desc: "Arborio, wild mushrooms", price: 18.0 },
    ],
  },
  {
    title: "Desserts",
    image: "/images/menu-desserts.webp",
    items: [
      { name: "Tiramisu", desc: "Mascarpone, espresso, cocoa", price: 7.5 },
      { name: "Cheesecake", desc: "Berry compote", price: 7.0 },
    ],
  },
  {
    title: "Beverages",
    image: "/images/menu-beverages.webp",
    items: [
      { name: "Red Wine (Glass)", desc: "Italian reds", price: 10.0 },
      { name: "White Wine (Glass)", desc: "Crisp and refreshing", price: 9.0 },
      { name: "Craft Beer", desc: "Local artisan brews", price: 6.0 },
      { name: "Espresso", desc: "Strong and aromatic", price: 3.0 },
    ],
  },
];

export default function Menu() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Hero
          image="/images/hero-dining-elegant.webp"
          title="Our Menu"
          subtitle="Authentic Italian flavors, crafted with passion and served with elegance."
        />
      </motion.div>

      {/* Menu sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 mt-10">
        {sections.map((sec, index) => (
          <motion.div
            key={sec.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card>
              {sec.image && (
                <motion.img
                  src={sec.image}
                  alt={sec.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <h3 className="text-xl font-semibold text-[var(--gold)] mb-3">{sec.title}</h3>
              <div>
                {sec.items.map((i) => (
                  <div
                    key={i.name}
                    className="flex justify-between py-2 border-b border-dashed border-gray-600"
                  >
                    <div>
                      <div className="font-semibold">{i.name}</div>
                      <div className="text-sm text-[var(--muted)]">{i.desc}</div>
                    </div>
                    <div className="text-[var(--gold)] font-medium">${i.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
