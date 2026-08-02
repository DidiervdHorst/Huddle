import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { font: 16, padX: 14, padY: 7, radius: 16 },
  md: { font: 20, padX: 18, padY: 9, radius: 20 },
  lg: { font: 34, padX: 26, padY: 14, radius: 28 },
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const s = sizeMap[size];
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center brand-gradient shadow-glow ${className}`}
      style={{ borderRadius: s.radius, paddingLeft: s.padX, paddingRight: s.padX, paddingTop: s.padY, paddingBottom: s.padY }}
    >
      <span
        className="font-display text-white leading-none select-none tracking-wide logo-shadow"
        style={{ fontSize: s.font }}
      >
        huddle
      </span>
    </motion.div>
  );
}
