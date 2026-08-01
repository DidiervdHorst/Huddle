import { motion } from "framer-motion";
import { useMemo } from "react";
import Icon from "./Icon";

const COLORS = ["#C2542E", "#3E7C93", "#D9A441", "#6E7B52", "#E0897E", "#4C8C6E"];

interface ConfettiProps {
  count?: number;
}

export default function Confetti({ count = 16 }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const distance = 55 + Math.random() * 85;
        const shape = i % 3;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 18,
          rotate: Math.random() * 360,
          color: COLORS[i % COLORS.length],
          shape,
          delay: Math.random() * 0.1,
          scale: 0.7 + Math.random() * 0.7,
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-visible">
      <div className="absolute top-1/2 left-1/2">
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ color: p.color }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: 0,
              scale: p.scale,
              rotate: p.rotate,
            }}
            transition={{ duration: 0.9, delay: p.delay, ease: "easeOut" }}
          >
            {p.shape === 0 ? (
              <Icon name="spark" size={13} />
            ) : p.shape === 1 ? (
              <span className="block rounded-sm" style={{ width: 7, height: 7, background: p.color }} />
            ) : (
              <span className="block rounded-full" style={{ width: 5, height: 9, background: p.color }} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
