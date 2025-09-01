import React from "react";
import ReservationForm from "../components/ReservationForm";
import Card from "../components/Card";
import Grid from "../components/Grid";

export default function Reservations() {
  return (
    <Grid columns={2}>
      <Card>
        <h2>Book a Table</h2>
        <ReservationForm />
      </Card>


      <Card>
        <h3>Why Reserve Online?</h3>
        <p>
          Secure your table instantly, avoid waiting, and ensure the perfect evening at Café Fausse.
        </p>
      </Card>
    </Grid>
  );
}
