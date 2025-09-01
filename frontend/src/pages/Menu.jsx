import React from "react";
import Card from "../components/Card";
import Grid from "../components/Grid";

const sections = [
  {
    title: "Starters",
    items: [
      { name: "Bruschetta", desc: "Fresh tomatoes, basil, olive oil, toasted baguette", price: 8.5 },
      { name: "Caesar Salad", desc: "Crisp romaine with house Caesar dressing", price: 9.0 },
    ],
  },
  {
    title: "Main Courses",
    items: [
      { name: "Grilled Salmon", desc: "Lemon butter, seasonal vegetables", price: 22.0 },
      { name: "Ribeye Steak", desc: "12 oz, garlic mashed potatoes", price: 28.0 },
      { name: "Vegetable Risotto", desc: "Arborio, wild mushrooms", price: 18.0 },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Tiramisu", desc: "Mascarpone, espresso, cocoa", price: 7.5 },
      { name: "Cheesecake", desc: "Berry compote", price: 7.0 },
    ],
  },
  {
    title: "Beverages",
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
    <Grid columns={2}>
      {sections.map((sec) => (
        <Card key={sec.title}>
          <h3>{sec.title}</h3>
          <div>
            {sec.items.map((i) => (
              <div
                key={i.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: ".5rem 0",
                  borderBottom: "1px dashed #2a2a2e",
                }}
              >
                
                <div>
                  <div style={{ fontWeight: 600 }}>{i.name}</div>
                  <div style={{ color: "var(--muted)", fontSize: ".9rem" }}>{i.desc}</div>
                </div>
                <div>${i.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </Grid>
  );
}
