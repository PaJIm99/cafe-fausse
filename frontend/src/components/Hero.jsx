export default function Hero({ image, title, subtitle }) {
  return (
    <section
      className="relative h-96 bg-cover bg-center flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* overlay */}
      <div className="relative z-10 text-white">
        <h2 className="text-4xl font-bold drop-shadow-lg">{title}</h2>
        <p className="mt-2 text-lg drop-shadow-md">{subtitle}</p>
      </div>
    </section>
  );
}
