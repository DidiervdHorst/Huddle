import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: 22,
  md: 30,
  lg: 52,
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const fontSize = sizeMap[size];
  return (
    <motion.div whileTap={{ scale: 0.95 }} className={`relative inline-flex ${className}`}>
      <span
        aria-hidden
        className="absolute font-display text-coral-dark leading-none select-none"
        style={{ fontSize, left: 2, top: 2.5 }}
      >
        huddle
      </span>
      <span className="relative font-display text-gold leading-none select-none" style={{ fontSize }}>
        huddle
      </span>
    </motion.div>
  );
}
