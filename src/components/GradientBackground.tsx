import { motion } from "framer-motion";
import Icon from "./Icon";

export default function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden huddle-paper-bg">
      <div className="absolute inset-0 huddle-grain pointer-events-none" />

      <motion.div
        className="absolute -top-10 -right-10 text-gold/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <Icon name="sun" size={150} strokeWidth={1.1} />
      </motion.div>

      <div className="absolute top-24 -left-8 text-ocean/15">
        <Icon name="palm" size={120} strokeWidth={1.1} />
      </div>

      <svg
        className="absolute bottom-24 left-0 w-full text-ocean/20"
        height="34"
        viewBox="0 0 400 34"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M0 20c16-14 33-14 50 0s34 14 50 0 33-14 50 0 34 14 50 0 33-14 50 0 34 14 50 0 33-14 50 0 34 14 50 0" />
      </svg>

      <motion.div
        className="absolute bottom-40 right-10 text-rust/25"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon name="spark" size={26} />
      </motion.div>
    </div>
  );
}
