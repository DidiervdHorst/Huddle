import { motion } from "framer-motion";
import Avatar from "../components/Avatar";
import Confetti from "../components/Confetti";
import Icon from "../components/Icon";
import {
  currentUser,
  activityOptions,
  inspirations,
  friends,
  upcomingBirthdays,
  friendName,
  daysUntilDate,
  type Huddle,
} from "../data/mockData";
import { formatHost } from "../lib/formatHost";
import { useState } from "react";

interface HomeScreenProps {
  huddles: Huddle[];
  onStartActivity: (activityId: string) => void;
  onStartOpen: () => void;
  onOpenDetail: (id: string) => void;
  onQuickJoin: (id: string) => void;
  onViewCalendar: () => void;
}

const homeActivityIds = ["coffee", "dinner", "drinks", "beach", "walk", "movie", "game", "campfire"];

export default function HomeScreen({
  huddles,
  onStartActivity,
  onStartOpen,
  onOpenDetail,
  onQuickJoin,
  onViewCalendar,
}: HomeScreenProps) {
  const [confettiId, setConfettiId] = useState<string | null>(null);
  const friendHuddles = huddles.filter((h) => h.hostId !== "me" && h.size === "small").slice(0, 4);
  const bigHuddles = [...huddles]
    .filter((h) => h.size === "big" && h.countdownDate)
    .sort((a, b) => daysUntilDate(a.countdownDate!) - daysUntilDate(b.countdownDate!));
  const birthdays = upcomingBirthdays().slice(0, 4);

  const handleQuickJoin = (id: string) => {
    onQuickJoin(id);
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
              className="font-display text-[32px] leading-tight text-ink"
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

      {/* Open Huddle CTA */}
      <div className="px-5 mt-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onStartOpen}
          className="w-full brand-gradient rounded-xl3 p-5 flex items-center gap-4 shadow-glow text-left"
        >
          <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center shrink-0 animate-bounceSoft">
            <Icon name="sun" size={24} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-lg text-white leading-tight">I'm free</p>
            <p className="text-xs text-white/85 font-semibold mt-0.5">
              No plan needed — let friends know you're around.
            </p>
          </div>
          <Icon name="chevron" size={16} className="text-white/80 -rotate-90 shrink-0" />
        </motion.button>
      </div>

      {/* Activity starters */}
      <div className="mt-7">
        <div className="px-5 flex items-center justify-between mb-2.5">
          <h2 className="font-display text-xl text-ink">Start a Huddle</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
          {homeActivityIds.map((id, i) => {
            const a = activityOptions.find((opt) => opt.id === id)!;
            return (
              <motion.button
                key={a.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 22 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => onStartActivity(a.id)}
                className={`shrink-0 w-24 h-24 ${a.color} rounded-xl2 flex flex-col items-center justify-center gap-2 shadow-pop`}
              >
                <Icon name={a.icon} size={26} strokeWidth={1.8} className="text-white" />
                <span className="text-white font-bold text-[11px] leading-tight text-center px-1.5">{a.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Inspiration */}
      <div className="mt-7">
        <div className="px-5 mb-2.5">
          <h2 className="font-display text-xl text-ink">Today's inspiration</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
          {inspirations.map((insp, i) => (
            <motion.button
              key={insp.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onStartActivity(insp.activityId)}
              className="shrink-0 w-52 card-surface rounded-xl2 shadow-card p-4 text-left flex flex-col gap-2.5"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-sun flex items-center justify-center">
                <Icon name={insp.icon} size={19} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-ink leading-snug">{insp.title}</p>
                <p className="text-xs text-ink-faint font-semibold mt-0.5">{insp.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Birthday strip */}
      {birthdays.length > 0 && (
        <div className="mt-7">
          <div className="px-5 flex items-center justify-between mb-2.5">
            <h2 className="font-display text-xl text-ink">Birthday Huddles</h2>
            <button onClick={onViewCalendar} className="text-xs font-bold text-lavender-dark">
              See all
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
            {birthdays.map((b, i) => (
              <motion.button
                key={b.friend.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={onViewCalendar}
                className="shrink-0 w-40 card-surface rounded-xl2 shadow-card p-4 flex flex-col items-center text-center gap-2"
              >
                <Avatar name={b.friend.name} color={b.friend.color} size={44} />
                <div>
                  <p className="font-bold text-sm text-ink">{b.friend.name}</p>
                  <p className="text-xs text-ink-faint font-semibold">
                    {b.days === 0 ? "Today!" : `In ${b.days} days`}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Friend feed */}
      <div className="px-5 mt-8">
        <h2 className="font-display text-xl text-ink mb-3">Happening now</h2>
        <div className="flex flex-col gap-4">
          {friendHuddles.map((h, i) => {
            const joinedFriends = friends.filter((f) => h.responses[f.id] === "in");
            const cohostNames = h.cohostIds.map(friendName);
            const isIn = h.myResponse === "in";
            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 260, damping: 24 }}
                onClick={() => onOpenDetail(h.id)}
                className="relative card-surface rounded-xl2 shadow-card p-4 overflow-visible cursor-pointer"
              >
                {confettiId === h.id && <Confetti />}
                <div className="flex items-center gap-3">
                  <Avatar name={friendName(h.hostId)} color={friends.find((f) => f.id === h.hostId)?.color ?? "bg-gradient-cool"} size={52} />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-ink text-base leading-tight truncate">
                      {formatHost(friendName(h.hostId), cohostNames)}
                    </p>
                    <p className="text-sm text-ink/80 font-semibold truncate flex items-center gap-1.5 mt-0.5">
                      <Icon name={h.icon} size={15} className="text-ink-soft shrink-0" />
                      {h.title}
                    </p>
                    <p className="text-xs text-ink-faint font-semibold mt-0.5">{h.timeLabel}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isIn) handleQuickJoin(h.id);
                    }}
                    className={`shrink-0 px-4 py-2.5 rounded-xl2 text-xs font-bold tracking-wide shadow-pop ${
                      isIn ? "bg-gradient-mint text-white" : "bg-gradient-warm text-white"
                    }`}
                  >
                    {isIn ? "You're in" : "I'm in"}
                  </motion.button>
                </div>

                {(joinedFriends.length > 0 || isIn) && (
                  <div className="flex items-center gap-1.5 mt-3 pl-[64px]">
                    <div className="flex -space-x-2">
                      {joinedFriends.map((f) => (
                        <Avatar key={f.id} name={f.name} color={f.color} size={22} ring />
                      ))}
                      {isIn && (
                        <motion.div initial={{ scale: 0, x: -10 }} animate={{ scale: 1, x: 0 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                          <Avatar name={currentUser.name} color={currentUser.avatarColor} size={22} ring />
                        </motion.div>
                      )}
                    </div>
                    <span className="text-[11px] text-ink-soft font-bold">
                      {joinedFriends.length + (isIn ? 1 : 0)} friend{joinedFriends.length + (isIn ? 1 : 0) === 1 ? "" : "s"} joined
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bigger huddles */}
      {bigHuddles.length > 0 && (
        <div className="px-5 mt-8">
          <h2 className="font-display text-xl text-ink mb-3">Coming up</h2>
          <div className="flex flex-col gap-3">
            {bigHuddles.map((h, i) => (
              <motion.button
                key={h.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onOpenDetail(h.id)}
                className="w-full flex items-center gap-3 bg-gradient-cool rounded-xl2 shadow-card p-4 text-left"
              >
                <div className="w-11 h-11 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                  <Icon name={h.icon} size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm truncate">{h.title}</p>
                  <p className="text-xs text-white/80 font-semibold">{h.timeLabel}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-white text-lg leading-none">{daysUntilDate(h.countdownDate!)}</p>
                  <p className="text-[10px] text-white/75 font-bold uppercase tracking-wide">days</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
