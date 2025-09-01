import React from "react";
import ReservationForm from "../components/ReservationForm";
import NewsletterForm from "../components/NewsletterForm";
import Hero from "../components/Hero";
import Grid from "../components/Grid";
import Card from "../components/Card";

export default function Home() {
  return (
    <div>
      <Hero
        image="/images/home-cafe-fausse.webp"
        title="Refined Italian Cuisine"
        subtitle="Experience Café Fausse, where tradition meets modern elegance."
      />

      <Grid columns={2} style={{ margin: "2rem 0" }}>
        <Card>
          <h3>Our Story</h3>
          <p>
            Café Fausse began with a passion for authentic Italian flavors and a dream of creating a cozy, elegant dining space. Our founders traveled through Italy, gathering recipes and inspiration to bring a true taste of Italy to our city.
          </p>
        </Card>
        <Card>
          <h3>Our Specialties</h3>
          <p>
            We specialize in handcrafted pasta, wood-fired pizzas, and a curated selection of Italian wines. Our signature dish, the "Fausse Carbonara," is a must-try for any visitor.
          </p>
        </Card>
      </Grid>

      <Grid columns={3} style={{ margin: "2rem 0" }}>
        <img src="/images/gallery-cafe-interior.webp" alt="Cafe interior" className="img" />
        <img src="/images/gallery-ribeye-steak.webp" alt="Ribeye steak" className="img" />
        <img src="/images/gallery-special-event.webp" alt="Special event" className="img" />
      </Grid>

      <Card style={{ margin: "2rem 0" }}>
        <h2>Join our newsletter</h2>
        <NewsletterForm />
      </Card>

      <Card>
        <h2>Reserve Your Table</h2>
        <ReservationForm compact={true} />
      </Card>
    </div>
  );
}
