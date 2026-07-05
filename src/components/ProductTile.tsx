export function ProductTile({
  emoji,
  color,
  className = "",
}: {
  emoji: string;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${color} ${className}`}
    >
      <span className="drop-shadow-sm" role="img" aria-hidden>
        {emoji}
      </span>
    </div>
  );
}
