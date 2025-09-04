export default function Grid({ children, cols = 3 }) {
  const colClasses = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 ${colClasses[cols] || "md:grid-cols-3"}`}>
      {children}
    </div>
  );
}
