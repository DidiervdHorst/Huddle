import { motion } from "framer-motion";
import Icon, { type IconName } from "./Icon";

export type Screen = "home" | "activity" | "profile";

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
  onCreate: () => void;
}

const navItems: { id: Screen; label: string; icon: IconName }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "activity", label: "Activity", icon: "chat" },
  { id: "profile", label: "Profile", icon: "person" },
];

export default function BottomNav({ active, onNavigate, onCreate }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="relative mx-4 mb-4">
        <div className="paper-panel rounded-xl2 shadow-card px-3 py-2.5 flex items-center justify-between">
          <NavButton item={navItems[0]} active={active === "home"} onClick={() => onNavigate("home")} />

          <div className="relative w-16 flex justify-center">
            <motion.button
              whileTap={{ scale: 0.9, y: 2, boxShadow: "1.5px 1.5px 0 rgba(34,29,22,0.92)" }}
              onClick={onCreate}
              aria-label="Create huddle"
              className="sticker absolute -top-9 w-16 h-16 rounded-full flex items-center justify-center bg-rust text-paper"
            >
              <Icon name="plus" size={26} strokeWidth={2.2} />
            </motion.button>
          </div>

          <div className="flex items-center gap-1">
            <NavButton item={navItems[1]} active={active === "activity"} onClick={() => onNavigate("activity")} />
            <NavButton item={navItems[2]} active={active === "profile"} onClick={() => onNavigate("profile")} />
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
  item: { id: Screen; label: string; icon: IconName };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="relative flex flex-col items-center justify-center w-16 py-1.5 rounded-xl2"
    >
      {active && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-gold/35 rounded-xl2 border border-ink/15"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className={`relative transition-transform ${active ? "text-ink scale-110" : "text-ink-faint"}`}>
        <Icon name={item.icon} size={20} strokeWidth={active ? 2 : 1.7} />
      </span>
      <span
        className={`relative text-[10px] font-bold mt-0.5 tracking-wide ${
          active ? "text-ink" : "text-ink-faint"
        }`}
      >
        {item.label}
      </span>
    </motion.button>
  );
}
