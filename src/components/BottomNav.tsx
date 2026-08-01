import { motion } from "framer-motion";

export type Screen = "home" | "activity" | "profile";

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
  onCreate: () => void;
}

const navItems: { id: Screen; label: string; emoji: string }[] = [
  { id: "home", label: "Home", emoji: "🏠" },
  { id: "activity", label: "Activity", emoji: "💬" },
  { id: "profile", label: "Profile", emoji: "👤" },
];

export default function BottomNav({ active, onNavigate, onCreate }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="relative mx-4 mb-4">
        <div className="glass-strong rounded-[28px] shadow-glass px-3 py-2.5 flex items-center justify-between">
          <NavButton
            item={navItems[0]}
            active={active === "home"}
            onClick={() => onNavigate("home")}
          />

          <div className="relative w-16 flex justify-center">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={onCreate}
              aria-label="Create huddle"
              className="absolute -top-9 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-floaty"
              style={{
                background:
                  "linear-gradient(135deg, #FF9B85 0%, #C7B3F5 55%, #7EC2E8 100%)",
              }}
            >
              <motion.span
                className="text-3xl font-light leading-none pb-0.5"
                initial={false}
              >
                +
              </motion.span>
            </motion.button>
          </div>

          <div className="flex items-center gap-1">
            <NavButton
              item={navItems[1]}
              active={active === "activity"}
              onClick={() => onNavigate("activity")}
            />
            <NavButton
              item={navItems[2]}
              active={active === "profile"}
              onClick={() => onNavigate("profile")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  item,
  active,
  onClick,
}: {
  item: { id: Screen; label: string; emoji: string };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="relative flex flex-col items-center justify-center w-16 py-1.5 rounded-2xl"
    >
      {active && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-white/70 rounded-2xl shadow-sm"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className={`relative text-xl transition-transform ${active ? "scale-110" : "opacity-60"}`}>
        {item.emoji}
      </span>
      <span
        className={`relative text-[10px] font-semibold mt-0.5 transition-colors ${
          active ? "text-ink" : "text-muted"
        }`}
      >
        {item.label}
      </span>
    </motion.button>
  );
}
