import { motion } from "framer-motion";
import { useState } from "react";
import Avatar from "../components/Avatar";
import Confetti from "../components/Confetti";
import Icon from "../components/Icon";
import { currentUser, huddleFeed, moodOptions, type MoodOption } from "../data/mockData";
import { formatHost } from "../lib/formatHost";

interface HomeScreenProps {
  onMoodTap: (mood: MoodOption) => void;
}

export default function HomeScreen({ onMoodTap }: HomeScreenProps) {
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
              className="font-display text-[30px] leading-tight text-navy-dark"
            >
              Hey {currentUser.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-ink-soft font-semibold mt-1"
            >
              What are you up for?
            </motion.p>
          </div>
          <motion.div whileTap={{ scale: 0.92 }} className="relative shrink-0">
            <Avatar name={currentUser.name} color={currentUser.avatarColor} size={48} ring />
          </motion.div>
        </div>
      </div>

      {/* Mood grid */}
      <div className="px-5 mt-4 grid grid-cols-3 gap-3.5">
        {moodOptions.map((mood, i) => (
          <MoodButton key={mood.id} mood={mood} index={i} onTap={() => onMoodTap(mood)} />
        ))}
      </div>

      {/* Friend activity feed */}
      <div className="px-5 mt-9">
        <h2 className="font-display text-xl text-navy-dark mb-3">Happening now</h2>
        <div className="flex flex-col gap-4">
          {huddleFeed.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 260, damping: 24 }}
              whileHover={{ y: -2 }}
              className="relative paper-card pop-sm rounded-xl2 p-4 overflow-visible"
            >
              {confettiId === card.id && <Confetti />}
              <div className="flex items-center gap-3">
                <Avatar name={card.name} color={card.avatarColor} size={52} />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-navy-dark text-base leading-tight">
                    {formatHost(card.name, card.withNames)}
                  </p>
                  <p className="text-sm text-ink/80 font-semibold truncate flex items-center gap-1.5 mt-0.5">
                    <Icon name={card.activityIcon} size={15} className="text-ink-soft shrink-0" />
                    {card.activityLabel}
                  </p>
                  <p className="text-xs text-ink-faint font-semibold mt-0.5">{card.status}</p>
                </div>
                <motion.button
                  whileTap={
                    card.cta === "JOIN" && !joined[card.id]
                      ? { scale: 0.94, y: 2, boxShadow: "0 1px 0 rgba(37,29,20,0.85)" }
                      : { scale: 0.94 }
                  }
                  onClick={() => card.cta === "JOIN" && handleJoin(card.id)}
                  className={`shrink-0 px-4 py-2.5 rounded-xl2 text-xs font-extrabold tracking-wide border-2 border-ink pop-sm ${
                    card.cta === "JOIN"
                      ? joined[card.id]
                        ? "bg-teal text-paper"
                        : "bg-gold text-ink"
                      : "bg-paper text-ink"
                  }`}
                >
                  {card.cta === "JOIN" ? (joined[card.id] ? "JOINED" : "JOIN") : "MESSAGE"}
                </motion.button>
              </div>

              {(card.joinedCount > 0 || joined[card.id]) && (
                <div className="flex items-center gap-1.5 mt-3 pl-[64px]">
                  <div className="flex -space-x-2">
                    {card.joinedNames.map((n, idx) => (
                      <Avatar key={idx} name={n} color="bg-ink-faint" size={22} ring />
                    ))}
                    {joined[card.id] && (
                      <motion.div
                        initial={{ scale: 0, x: -10 }}
                        animate={{ scale: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      >
                        <Avatar name={currentUser.name} color={currentUser.avatarColor} size={22} ring />
                      </motion.div>
                    )}
                  </div>
                  <span className="text-[11px] text-ink-soft font-bold">
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
      whileTap={{ scale: 0.94, y: 3, boxShadow: "0 1px 0 rgba(37,29,20,0.85)" }}
      onClick={onTap}
      className={`pop ${mood.color} rounded-xl2 aspect-square flex flex-col items-center justify-center gap-1.5`}
    >
      <Icon name={mood.icon} size={24} strokeWidth={2.3} className="text-paper" />
      <span className="text-paper font-bold text-[11px] leading-tight text-center px-1">
        {mood.label}
      </span>
    </motion.button>
  );
}
