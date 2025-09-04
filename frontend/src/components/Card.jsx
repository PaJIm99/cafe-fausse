export default function Card({ children }) {
  return (
    <div className="card bg-[var(--card)] rounded-2xl p-6 shadow-lg border border-[#2b2b2f] hover:shadow-xl hover:border-[#d4af37]/40 transition-all">
      {children}
    </div>
  );
}
