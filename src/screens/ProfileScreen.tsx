import { motion } from "framer-motion";
import Avatar from "../components/Avatar";
import Icon from "../components/Icon";
import { currentUser, friends } from "../data/mockData";
import type { Availability } from "../data/mockData";

interface ProfileScreenProps {
  availability: Availability;
  onChangeAvailability: (a: Availability) => void;
}

const availabilityOptions: { id: Availability; label: string; color: string }[] = [
  { id: "free", label: "Free", color: "bg-reef" },
  { id: "maybe", label: "Maybe", color: "bg-gold" },
  { id: "busy", label: "Busy", color: "bg-rust" },
];

export default function ProfileScreen({ availability, onChangeAvailability }: ProfileScreenProps) {
  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar pb-32">
      <div className="px-5 pt-20 pb-2 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative"
        >
          <Avatar name={currentUser.name} color={currentUser.avatarColor} size={92} ring />
          <motion.span
            className="absolute -bottom-1 -right-2 text-rust animate-floatSlow"
          >
            <Icon name="spark" size={26} />
          </motion.span>
        </motion.div>
        <h1 className="font-display text-2xl text-ink mt-3">{currentUser.name}</h1>
        <p className="text-ink-soft font-semibold text-sm mt-0.5">Always down for something spontaneous</p>
      </div>

      {/* Availability toggle */}
      <div className="px-5 mt-6">
        <p className="text-xs font-extrabold text-ink-faint uppercase tracking-wider mb-2.5">Your status</p>
        <div className="paper-card rounded-xl2 p-1.5 flex gap-1.5 shadow-card">
          {availabilityOptions.map((opt) => (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChangeAvailability(opt.id)}
              className="relative flex-1 py-3 rounded-xl2 flex flex-col items-center gap-1.5"
            >
              {availability === opt.id && (
                <motion.div
                  layoutId="availability-pill"
                  className={`absolute inset-0 rounded-xl2 ${opt.color} border-2 border-ink`}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative w-2.5 h-2.5 rounded-full border border-ink/40 ${
                  availability === opt.id ? "bg-paper" : opt.color
                }`}
              />
              <span
                className={`relative text-xs font-extrabold ${
                  availability === opt.id ? "text-paper" : "text-ink/60"
                }`}
              >
                {opt.label}
              </span>
            </motion.button>
          ))}
        </div>
        <p className="text-center text-[11px] text-ink-faint font-semibold mt-2">
          Friends instantly see when you're{" "}
          {availabilityOptions.find((o) => o.id === availability)?.label.toLowerCase()}
        </p>
      </div>

      {/* Interests */}
      <div className="px-5 mt-7">
        <p className="text-xs font-extrabold text-ink-faint uppercase tracking-wider mb-2.5">Interests</p>
        <div className="flex flex-wrap gap-2">
          {currentUser.interests.map((interest, i) => (
            <motion.span
              key={interest}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="px-3.5 py-2 rounded-xl2 paper-card text-xs font-bold text-ink/80 shadow-card"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Favorite activities */}
      <div className="px-5 mt-7">
        <p className="text-xs font-extrabold text-ink-faint uppercase tracking-wider mb-2.5">Favorite activities</p>
        <div className="grid grid-cols-4 gap-2.5">
          {currentUser.favoriteActivities.map((act, i) => (
            <motion.div
              key={act.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="paper-card rounded-xl2 py-3.5 flex items-center justify-center shadow-card text-ink-soft"
              title={act.label}
            >
              <Icon name={act.icon} size={22} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Friends */}
      <div className="px-5 mt-7">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs font-extrabold text-ink-faint uppercase tracking-wider">Friends</p>
          <span className="text-xs font-extrabold text-ocean">{friends.length}</span>
        </div>
        <div className="flex flex-col gap-2">
          {friends.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="paper-card rounded-xl2 px-3.5 py-2.5 flex items-center gap-3 shadow-card"
            >
              <Avatar name={f.name} color={f.color} size={40} />
              <span className="font-extrabold text-sm text-ink flex-1">{f.name}</span>
              <span
                className={`flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-ink/15 ${
                  f.availability === "free"
                    ? "bg-reef/20 text-reef-dark"
                    : f.availability === "maybe"
                      ? "bg-gold/25 text-gold-dark"
                      : "bg-rust/20 text-rust-dark"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    f.availability === "free" ? "bg-reef" : f.availability === "maybe" ? "bg-gold" : "bg-rust"
                  }`}
                />
                {f.availability === "free" ? "Free" : f.availability === "maybe" ? "Maybe" : "Busy"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
