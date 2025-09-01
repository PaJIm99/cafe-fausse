export default function Hero({ image, title, subtitle }) {
  return (
    <section
      className="h-96 bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="mt-2 text-lg">{subtitle}</p>
    </section>
  );
}
