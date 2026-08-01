import { motion } from "framer-motion";
import Avatar from "../components/Avatar";
import { activityNotifications, friends } from "../data/mockData";

const typeMeta: Record<string, { icon: string; ring: string }> = {
  joined: { icon: "🙌", ring: "ring-mint" },
  message: { icon: "💬", ring: "ring-sky" },
  started: { icon: "⚡", ring: "ring-coral" },
};

export default function ActivityScreen() {
  const freeNow = friends.filter((f) => f.availability === "free");

  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar pb-32">
      <div className="px-5 pt-20 pb-2">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-[26px] text-ink"
        >
          Activity 💬
        </motion.h1>
        <p className="text-muted font-medium mt-1">What your friends are up to</p>
      </div>

      {/* Free right now strip */}
      <div className="mt-3 px-5">
        <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2.5">Free right now</p>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {freeNow.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              <div className="relative">
                <Avatar emoji={f.emoji} gradient={f.color} size={56} />
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-mint-dark ring-2 ring-white animate-pulseSoft" />
              </div>
              <span className="text-[11px] font-bold text-ink/80">{f.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notifications feed */}
      <div className="px-5 mt-6">
        <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2.5">Recent</p>
        <div className="flex flex-col gap-3">
          {activityNotifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 24 }}
              className="glass rounded-xl2 p-3.5 flex items-center gap-3 shadow-card"
            >
              <div className={`relative ring-2 ${typeMeta[n.type].ring} rounded-full`}>
                <Avatar emoji={n.emoji} gradient={n.color} size={44} />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] shadow-sm">
                  {typeMeta[n.type].icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink font-medium leading-snug">
                  <span className="font-bold">{n.name}</span> {n.text}
                </p>
                <p className="text-[11px] text-muted font-semibold mt-0.5">{n.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
