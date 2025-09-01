import { useState } from "react";

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
            className="cursor-pointer rounded"
            onClick={() => setSelected(img)}
          />
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <img src={selected} alt="enlarged" className="max-h-[90%] max-w-[90%]" />
        </div>
      )}
    </div>
  );
}
