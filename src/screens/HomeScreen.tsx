import { motion } from "framer-motion";
import { useState } from "react";
import Avatar from "../components/Avatar";
import Confetti from "../components/Confetti";
import { currentUser, huddleFeed, moodOptions, type MoodOption } from "../data/mockData";
import type { Availability } from "../data/mockData";

interface HomeScreenProps {
  onMoodTap: (mood: MoodOption) => void;
  availability: Availability;
}

const availabilityMeta: Record<Availability, { label: string; dot: string }> = {
  free: { label: "Free", dot: "bg-mint-dark" },
  maybe: { label: "Maybe", dot: "bg-peach-dark" },
  busy: { label: "Busy", dot: "bg-coral-dark" },
};

export default function HomeScreen({ onMoodTap, availability }: HomeScreenProps) {
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [confettiId, setConfettiId] = useState<string | null>(null);

  const handleJoin = (id: string) => {
    if (joined[id]) return;
    setJoined((prev) => ({ ...prev, [id]: true }));
    setConfettiId(id);
    setTimeout(() => setConfettiId(null), 950);
  };

  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar pb-32">
      {/* Header */}
      <div className="px-5 pt-20 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-[28px] leading-tight text-ink"
            >
              Hey {currentUser.name} 👋
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-muted font-medium mt-1"
            >
              What are you up for?
            </motion.p>
          </div>
          <motion.div whileTap={{ scale: 0.92 }} className="relative shrink-0">
            <Avatar emoji={currentUser.avatarEmoji} gradient="from-lavender to-coral" size={48} ring />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ring-2 ring-white ${availabilityMeta[availability].dot}`}
            />
          </motion.div>
        </div>
      </div>

      {/* Mood grid */}
      <div className="px-5 mt-4 grid grid-cols-3 gap-3">
        {moodOptions.map((mood, i) => (
          <MoodButton key={mood.id} mood={mood} index={i} onTap={() => onMoodTap(mood)} />
        ))}
      </div>

      {/* Friend activity feed */}
      <div className="px-5 mt-8">
        <h2 className="font-display font-bold text-lg text-ink mb-3">Happening now</h2>
        <div className="flex flex-col gap-4">
          {huddleFeed.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 260, damping: 24 }}
              whileHover={{ y: -2 }}
              className="relative glass-strong rounded-xl2 p-4 shadow-card overflow-visible"
            >
              {confettiId === card.id && <Confetti />}
              <div className="flex items-center gap-3">
                <Avatar emoji={card.avatarEmoji} gradient={card.avatarColor} size={52} />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-ink text-[15px]">{card.name}</p>
                  <p className="text-sm text-ink/80 font-medium truncate">
                    {card.activityEmoji} {card.activityLabel}
                  </p>
                  <p className="text-xs text-muted font-medium mt-0.5">{card.status}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => card.cta === "JOIN" && handleJoin(card.id)}
                  className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-bold tracking-wide shadow-sm transition-colors ${
                    card.cta === "JOIN"
                      ? joined[card.id]
                        ? "bg-mint-dark text-white"
                        : "text-white"
                      : "bg-white/80 text-ink"
                  }`}
                  style={
                    card.cta === "JOIN" && !joined[card.id]
                      ? { background: "linear-gradient(135deg, #FF9B85, #C7B3F5)" }
                      : undefined
                  }
                >
                  {card.cta === "JOIN" ? (joined[card.id] ? "JOINED ✓" : "JOIN") : "MESSAGE"}
                </motion.button>
              </div>

              {(card.joinedCount > 0 || joined[card.id]) && (
                <div className="flex items-center gap-1.5 mt-3 pl-[64px]">
                  <div className="flex -space-x-2">
                    {card.joinedAvatars.map((e, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full bg-white ring-2 ring-white flex items-center justify-center text-[11px] shadow-sm"
                      >
                        {e}
                      </div>
                    ))}
                    {joined[card.id] && (
                      <motion.div
                        initial={{ scale: 0, x: -10 }}
                        animate={{ scale: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-lavender to-coral ring-2 ring-white flex items-center justify-center text-[11px] shadow-sm"
                      >
                        {currentUser.avatarEmoji}
                      </motion.div>
                    )}
                  </div>
                  <span className="text-[11px] text-muted font-semibold">
                    {card.joinedCount + (joined[card.id] ? 1 : 0)} friend
                    {card.joinedCount + (joined[card.id] ? 1 : 0) === 1 ? "" : "s"} joined
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MoodButton({ mood, index, onTap }: { mood: MoodOption; index: number; onTap: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 22 }}
      whileTap={{ scale: 0.92 }}
      onClick={onTap}
      className={`relative bg-gradient-to-br ${mood.gradient} rounded-xl2 aspect-square flex flex-col items-center justify-center gap-1 shadow-card overflow-hidden`}
    >
      <div className="absolute inset-0 bg-white/10" />
      <span className="text-2xl relative">{mood.emoji}</span>
      <span className="text-white font-bold text-[11px] leading-tight text-center px-1 relative drop-shadow-sm">
        {mood.label}
      </span>
    </motion.button>
  );
}
