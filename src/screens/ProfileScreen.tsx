import { motion } from "framer-motion";
import Avatar from "../components/Avatar";
import { currentUser, friends } from "../data/mockData";
import type { Availability } from "../data/mockData";

interface ProfileScreenProps {
  availability: Availability;
  onChangeAvailability: (a: Availability) => void;
}

const availabilityOptions: { id: Availability; label: string; emoji: string; gradient: string }[] = [
  { id: "free", label: "Free", emoji: "🟢", gradient: "from-mint to-mint-dark" },
  { id: "maybe", label: "Maybe", emoji: "🟡", gradient: "from-peach to-peach-dark" },
  { id: "busy", label: "Busy", emoji: "🔴", gradient: "from-coral to-coral-dark" },
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
          <Avatar emoji={currentUser.avatarEmoji} gradient="from-lavender to-coral" size={92} ring />
          <span className="absolute -bottom-1 -right-1 text-2xl animate-floatSlow">✨</span>
        </motion.div>
        <h1 className="font-display font-bold text-2xl text-ink mt-3">{currentUser.name}</h1>
        <p className="text-muted font-medium text-sm mt-0.5">Always down for something spontaneous</p>
      </div>

      {/* Availability toggle */}
      <div className="px-5 mt-6">
        <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2.5">Your status</p>
        <div className="glass-strong rounded-xl2 p-1.5 flex gap-1.5 shadow-card">
          {availabilityOptions.map((opt) => (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => onChangeAvailability(opt.id)}
              className="relative flex-1 py-3 rounded-2xl flex flex-col items-center gap-1"
            >
              {availability === opt.id && (
                <motion.div
                  layoutId="availability-pill"
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${opt.gradient} shadow-sm`}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative text-lg">{opt.emoji}</span>
              <span
                className={`relative text-xs font-bold ${
                  availability === opt.id ? "text-white" : "text-ink/60"
                }`}
              >
                {opt.label}
              </span>
            </motion.button>
          ))}
        </div>
        <p className="text-center text-[11px] text-muted font-medium mt-2">
          Friends instantly see when you're {availabilityOptions.find((o) => o.id === availability)?.label.toLowerCase()}
        </p>
      </div>

      {/* Interests */}
      <div className="px-5 mt-7">
        <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2.5">Interests</p>
        <div className="flex flex-wrap gap-2">
          {currentUser.interests.map((interest, i) => (
            <motion.span
              key={interest}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="px-3.5 py-2 rounded-full glass text-xs font-bold text-ink/80 shadow-sm"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Favorite activities */}
      <div className="px-5 mt-7">
        <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2.5">Favorite activities</p>
        <div className="grid grid-cols-4 gap-2.5">
          {currentUser.favoriteActivities.map((act, i) => (
            <motion.div
              key={act}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-strong rounded-2xl py-3 flex items-center justify-center text-lg shadow-sm"
            >
              {act.split(" ")[0]}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Friends */}
      <div className="px-5 mt-7">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs font-bold text-muted uppercase tracking-wide">Friends</p>
          <span className="text-xs font-bold text-lavender-dark">{friends.length}</span>
        </div>
        <div className="flex flex-col gap-2">
          {friends.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass rounded-2xl px-3.5 py-2.5 flex items-center gap-3 shadow-sm"
            >
              <Avatar emoji={f.emoji} gradient={f.color} size={40} />
              <span className="font-bold text-sm text-ink flex-1">{f.name}</span>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  f.availability === "free"
                    ? "bg-mint/40 text-mint-dark"
                    : f.availability === "maybe"
                      ? "bg-peach/40 text-peach-dark"
                      : "bg-coral/30 text-coral-dark"
                }`}
              >
                {f.availability === "free" ? "🟢 Free" : f.availability === "maybe" ? "🟡 Maybe" : "🔴 Busy"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
