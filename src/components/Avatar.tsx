interface AvatarProps {
  emoji: string;
  gradient: string;
  size?: number;
  ring?: boolean;
  className?: string;
}

export default function Avatar({ emoji, gradient, size = 48, ring = false, className = "" }: AvatarProps) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center shrink-0 shadow-sm ${
        ring ? "ring-4 ring-white" : ""
      } ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.48 }}
    >
      <span className="drop-shadow-sm select-none">{emoji}</span>
    </div>
  );
}
