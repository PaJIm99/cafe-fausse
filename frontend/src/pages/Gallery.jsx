import React from "react";
import Lightbox from "../components/Lightbox";

const images = [
  "/images/gallery-cafe-interior.webp",
  "/images/gallery-ribeye-steak.webp",
  "/images/gallery-special-event.webp",
];

export default function Gallery() {
  return (
    <div>
      <Lightbox images={images} />

      <div className="card mt-6">
        <h3>Awards & Reviews</h3>
        <ul>
          <li>Culinary Excellence Award – 2022</li>
          <li>Restaurant of the Year – 2023</li>
          <li>Best Fine Dining Experience – Foodie Magazine, 2023</li>
        </ul>
        <blockquote className="text-gray-500">
          “Exceptional ambiance and unforgettable flavors.” – Gourmet Review
        </blockquote>
        <blockquote className="text-gray-500">
          “A must-visit restaurant for food enthusiasts.” – The Daily Bite
        </blockquote>
      </div>
    </div>
  );
}
