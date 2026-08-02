import { motion } from "framer-motion";
import Avatar from "../components/Avatar";
import Icon, { type IconName } from "../components/Icon";
import { daysUntilDate, friendName, upcomingBirthdays, type Huddle } from "../data/mockData";

interface CalendarScreenProps {
  huddles: Huddle[];
  onOpenDetail: (id: string) => void;
  onStartCustom: (title: string, icon: IconName) => void;
}

const birthdaySuggestions: { label: string; icon: IconName; build: (name: string) => string }[] = [
  { label: "Start a Birthday Huddle", icon: "cake", build: (n) => `${n}'s Birthday Huddle` },
  { label: "Dinner together", icon: "pizza", build: (n) => `Dinner for ${n}` },
  { label: "Group gift", icon: "gift", build: (n) => `Group gift for ${n}` },
  { label: "Surprise party", icon: "balloon", build: (n) => `Surprise party for ${n}` },
];

export default function CalendarScreen({ huddles, onOpenDetail, onStartCustom }: CalendarScreenProps) {
  const upcoming = huddles.filter((h) => h.size === "small" && (h.hostId === "me" || h.myResponse === "in"));
  const bigHuddles = [...huddles]
    .filter((h) => h.size === "big")
    .sort((a, b) => (a.countdownDate && b.countdownDate ? daysUntilDate(a.countdownDate) - daysUntilDate(b.countdownDate) : 0));
  const pollsWaiting = bigHuddles.filter((h) => h.datePoll && !h.datePoll.some((o) => o.votes.includes("me")));
  const birthdays = upcomingBirthdays().slice(0, 5);

  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar pb-32">
      <div className="px-5 pt-20 pb-2">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-[28px] text-ink">
          Calendar
        </motion.h1>
        <p className="text-ink-soft font-semibold mt-1">Everything to look forward to</p>
      </div>

      {pollsWaiting.length > 0 && (
        <div className="px-5 mt-5">
          <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Waiting on your vote</p>
          <div className="flex flex-col gap-2.5">
            {pollsWaiting.map((h) => (
              <motion.button
                key={h.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenDetail(h.id)}
                className="w-full flex items-center gap-3 bg-gradient-berry rounded-xl2 shadow-card p-4 text-left"
              >
                <div className="w-11 h-11 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                  <Icon name="poll" size={19} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm truncate">{h.title}</p>
                  <p className="text-xs text-white/85 font-semibold">Pick a date that works for you</p>
                </div>
                <Icon name="chevron" size={15} className="text-white/80 -rotate-90 shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="px-5 mt-7">
        <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Your upcoming Huddles</p>
        {upcoming.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {upcoming.map((h, i) => (
              <motion.button
                key={h.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onOpenDetail(h.id)}
                className="w-full flex items-center gap-3 card-surface rounded-xl2 shadow-card p-4 text-left"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-warm flex items-center justify-center shrink-0">
                  <Icon name={h.icon} size={19} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-ink text-sm truncate">{h.title}</p>
                  <p className="text-xs text-ink-faint font-semibold">
                    {h.timeLabel}
                    {h.location ? ` · ${h.location}` : ""}
                  </p>
                </div>
                {h.hostId === "me" && (
                  <span className="text-[10px] font-bold text-lavender-dark bg-lavender-light/40 px-2 py-1 rounded-full shrink-0">
                    Hosting
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-faint font-semibold">Nothing locked in yet — plenty of room for spontaneity.</p>
        )}
      </div>

      {bigHuddles.length > 0 && (
        <div className="px-5 mt-7">
          <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Bigger moments</p>
          <div className="flex flex-col gap-3">
            {bigHuddles.map((h, i) => (
              <motion.button
                key={h.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onOpenDetail(h.id)}
                className="w-full card-surface rounded-xl2 shadow-card p-4 text-left overflow-hidden relative"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-cool flex items-center justify-center shrink-0">
                    <Icon name={h.icon} size={21} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-ink text-base leading-tight truncate">{h.title}</p>
                    <p className="text-xs text-ink-faint font-semibold mt-0.5">
                      {formatHostLine(h)} · {h.timeLabel}
                    </p>
                  </div>
                  {h.countdownDate && (
                    <div className="text-right shrink-0">
                      <p className="font-display text-ink text-xl leading-none">{daysUntilDate(h.countdownDate)}</p>
                      <p className="text-[9px] text-ink-faint font-bold uppercase tracking-wide">days</p>
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {birthdays.length > 0 && (
        <div className="px-5 mt-7">
          <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Birthday Huddles</p>
          <div className="flex flex-col gap-3">
            {birthdays.map((b, i) => (
              <motion.div
                key={b.friend.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="card-surface rounded-xl2 shadow-card p-4"
              >
                <div className="flex items-center gap-3 mb-1">
                  <Avatar name={b.friend.name} color={b.friend.color} size={40} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-ink">{b.friend.name}</p>
                    <p className="text-xs text-ink-faint font-semibold">{b.days === 0 ? "Today!" : `In ${b.days} days`}</p>
                  </div>
                </div>
                {i < 2 && (
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2 -mx-1 px-1">
                    {birthdaySuggestions.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => onStartCustom(s.build(b.friend.name), s.icon)}
                        className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-cream-soft text-ink/70 text-[11px] font-bold whitespace-nowrap"
                      >
                        <Icon name={s.icon} size={13} />
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function formatHostLine(h: Huddle) {
  return h.hostId === "me" ? "You're hosting" : `Hosted by ${friendName(h.hostId)}`;
}
