import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#8FE8C4", "#C7B3F5", "#FF9B85", "#FFC79B", "#A8D8F0", "#FF7A5C"];
const SHAPES = ["🎉", "✨", "🎊", "💫"];

interface ConfettiProps {
  originX?: number;
  originY?: number;
  count?: number;
}

export default function Confetti({ count = 18 }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const distance = 60 + Math.random() * 90;
        const isEmoji = Math.random() > 0.6;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 20,
          rotate: Math.random() * 360,
          color: COLORS[i % COLORS.length],
          emoji: SHAPES[i % SHAPES.length],
          isEmoji,
          delay: Math.random() * 0.1,
          scale: 0.6 + Math.random() * 0.8,
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
            {p.isEmoji ? (
              <span style={{ fontSize: 16 }}>{p.emoji}</span>
            ) : (
              <span
                className="block rounded-sm"
                style={{ width: 8, height: 8, background: p.color }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
