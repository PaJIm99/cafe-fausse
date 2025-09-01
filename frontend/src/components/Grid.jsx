export default function Grid({ children, cols = 3 }) {
  return (
    <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols}`}>
      {children}
    </div>
  );
}
