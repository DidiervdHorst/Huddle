import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Confetti from "./Confetti";

interface FreeToastProps {
  open: boolean;
  onClose: () => void;
}

export default function FreeToast({ open, onClose }: FreeToastProps) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 1800);
    return () => clearTimeout(t);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[80] flex items-center justify-center bg-ink/20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="relative glass-strong rounded-xl3 px-8 py-8 flex flex-col items-center shadow-glass mx-8"
          >
            <Confetti count={22} />
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center text-3xl shadow-floaty"
            >
              🟢
            </motion.div>
            <h2 className="font-display font-bold text-xl text-ink mt-4">You're free!</h2>
            <p className="text-muted font-medium text-sm mt-1 text-center max-w-[200px]">
              Your friends can now see you're up for something
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
