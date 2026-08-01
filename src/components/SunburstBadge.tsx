import type { ReactNode } from "react";

interface SunburstBadgeProps {
  size?: number;
  spikes?: number;
  color?: string;
  className?: string;
  children?: ReactNode;
}

export default function SunburstBadge({
  size = 100,
  spikes = 16,
  color = "#DFA82F",
  className = "",
  children,
}: SunburstBadgeProps) {
  const outer = 50;
  const inner = 37;
  const points: string[] = [];
  const total = spikes * 2;
  for (let i = 0; i < total; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg className="absolute inset-0" viewBox="0 0 100 100" width={size} height={size}>
        <polygon points={points.join(" ")} fill={color} />
      </svg>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
