import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { box: 32, text: "text-base", radius: "rounded-xl" },
  md: { box: 44, text: "text-xl", radius: "rounded-2xl" },
  lg: { box: 88, text: "text-4xl", radius: "rounded-[28px]" },
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const s = sizeMap[size];
  return (
    <motion.div
      whileTap={{ scale: 0.94 }}
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <div
        className={`logo-gradient ${s.radius} shadow-floaty flex items-center justify-center animate-blobMove`}
        style={{ width: s.box, height: s.box, backgroundSize: "200% 200%" }}
      >
        <span
          className="font-display font-bold text-white select-none"
          style={{ fontSize: s.box * 0.52 }}
        >
          h
        </span>
      </div>
      {size !== "sm" && (
        <span className={`font-display font-bold ${s.text} text-ink tracking-tight`}>
          huddle
        </span>
      )}
    </motion.div>
  );
}
