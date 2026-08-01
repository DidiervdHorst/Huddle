import { motion } from "framer-motion";
import Avatar from "../components/Avatar";
import Icon, { type IconName } from "../components/Icon";
import { activityNotifications, huddleFeed } from "../data/mockData";

const typeMeta: Record<string, { icon: IconName; badge: string }> = {
  joined: { icon: "check", badge: "bg-teal" },
  message: { icon: "chat", badge: "bg-navy" },
  started: { icon: "lightning", badge: "bg-gold-dark" },
};

export default function ActivityScreen() {
  const liveNow = huddleFeed.filter((c) => c.kind === "join");

  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar pb-32">
      <div className="px-5 pt-20 pb-2">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[26px] text-navy-dark"
        >
          Activity
        </motion.h1>
        <p className="text-ink-soft font-semibold mt-1">What your friends are up to</p>
      </div>

      {/* Live now strip */}
      <div className="mt-3 px-5">
        <p className="text-xs font-extrabold text-ink-faint uppercase tracking-wider mb-2.5">Live now</p>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {liveNow.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-1.5 shrink-0 w-16"
            >
              <div className="relative">
                <Avatar name={c.name} color={c.avatarColor} size={56} />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal border-2 border-paper flex items-center justify-center text-paper">
                  <Icon name={c.activityIcon} size={10} strokeWidth={2.6} />
                </span>
              </div>
              <span className="text-[11px] font-bold text-ink/80 text-center leading-tight">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notifications feed */}
      <div className="px-5 mt-6">
        <p className="text-xs font-extrabold text-ink-faint uppercase tracking-wider mb-2.5">Recent</p>
        <div className="flex flex-col gap-3">
          {activityNotifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 24 }}
              className="paper-card rounded-xl2 p-3.5 flex items-center gap-3 shadow-card"
            >
              <div className="relative">
                <Avatar name={n.name} color={n.color} size={44} />
                <span
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${typeMeta[n.type].badge} border-2 border-paper flex items-center justify-center text-paper`}
                >
                  <Icon name={typeMeta[n.type].icon} size={11} strokeWidth={2.4} />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink font-semibold leading-snug">
                  <span className="font-extrabold">{n.name}</span> {n.text}
                </p>
                <p className="text-[11px] text-ink-faint font-bold mt-0.5">{n.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

