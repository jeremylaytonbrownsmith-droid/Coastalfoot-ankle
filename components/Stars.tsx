export default function Stars({
  rating = 5,
  className = "h-6 w-6",
}: {
  rating?: number;
  className?: string;
}) {
  return (
    <span
      className="inline-flex gap-0.5 text-amber-500"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
          className={className}
        >
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9 2.9-6z" />
        </svg>
      ))}
    </span>
  );
}
