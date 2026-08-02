interface AvatarProps {
  name: string;
  color: string;
  size?: number;
  ring?: boolean;
  className?: string;
}

export default function Avatar({ name, color, size = 48, ring = false, className = "" }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <div
      className={`${color} rounded-full flex items-center justify-center shrink-0 shadow-pop ${
        ring ? "ring-[3px] ring-white" : ""
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="font-display text-white leading-none select-none"
        style={{ fontSize: size * 0.42, transform: "translateY(1px)" }}
      >
        {initial}
      </span>
    </div>
  );
}
