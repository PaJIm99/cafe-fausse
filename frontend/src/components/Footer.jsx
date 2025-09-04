export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#333] bg-black/90 backdrop-blur py-6 text-center text-sm text-gray-400">
      <p>
        © {new Date().getFullYear()} <span className="text-[#d4af37]">Café Fausse</span> • 1234 Culinary Ave, Suite 100, Washington, DC 20002 • (202) 555-4567
      </p>
    </footer>
  );
}
