import { motion } from "framer-motion";
import Icon from "./Icon";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { text: 20, icon: 14 },
  md: { text: 26, icon: 17 },
  lg: { text: 42, icon: 26 },
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const s = sizeMap[size];
  return (
    <motion.div whileTap={{ scale: 0.95 }} className={`inline-flex items-center gap-1 ${className}`}>
      <span
        className="font-display text-ink leading-none select-none"
        style={{ fontSize: s.text }}
      >
        huddle
      </span>
      <Icon name="starburst" size={s.icon} className="text-rust -translate-y-1" />
    </motion.div>
  );
}
