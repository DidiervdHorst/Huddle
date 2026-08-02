import { motion } from "framer-motion";
import Avatar from "../components/Avatar";
import Icon, { type IconName } from "../components/Icon";
import { activityNotifications, friendName, friends, type Huddle, type ResponseStatus } from "../data/mockData";

interface HuddlesScreenProps {
  huddles: Huddle[];
  onOpenDetail: (id: string) => void;
  onRespond: (id: string, status: ResponseStatus) => void;
}

const typeMeta: Record<string, { icon: IconName; badge: string }> = {
  joined: { icon: "check", badge: "bg-gradient-mint" },
  message: { icon: "chat", badge: "bg-gradient-cool" },
  started: { icon: "lightning", badge: "bg-gradient-sun" },
};

export default function HuddlesScreen({ huddles, onOpenDetail, onRespond }: HuddlesScreenProps) {
  const needsResponse = huddles.filter((h) => h.hostId !== "me" && !h.myResponse);
  const liveNow = huddles.filter((h) => h.hostId !== "me").slice(0, 6);

  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar pb-32">
      <div className="px-5 pt-20 pb-2">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-[28px] text-ink">
          Your Huddles
        </motion.h1>
        <p className="text-ink-soft font-semibold mt-1">What your friends are up to</p>
      </div>

      {needsResponse.length > 0 && (
        <div className="px-5 mt-4">
          <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Waiting for you</p>
          <div className="flex flex-col gap-3">
            {needsResponse.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-surface rounded-xl2 shadow-card p-4"
              >
                <button onClick={() => onOpenDetail(h.id)} className="w-full flex items-center gap-3 text-left mb-3">
                  <Avatar name={friendName(h.hostId)} color={friends.find((f) => f.id === h.hostId)?.color ?? "bg-gradient-cool"} size={44} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-ink truncate flex items-center gap-1.5">
                      <Icon name={h.icon} size={14} className="text-ink-soft shrink-0" />
                      {h.title}
                    </p>
                    <p className="text-xs text-ink-faint font-semibold mt-0.5">
                      {friendName(h.hostId)} · {h.timeLabel}
                    </p>
                  </div>
                </button>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onRespond(h.id, "in")}
                    className="py-2 rounded-xl text-[11px] font-bold bg-gradient-mint text-white shadow-pop"
                  >
                    I'm in
                  </button>
                  <button onClick={() => onRespond(h.id, "maybe")} className="py-2 rounded-xl text-[11px] font-bold bg-gradient-sun text-ink">
                    Maybe
                  </button>
                  <button onClick={() => onRespond(h.id, "not")} className="py-2 rounded-xl text-[11px] font-bold bg-ink/8 text-ink-soft">
                    Not this time
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Live now strip */}
      <div className="mt-7 px-5">
        <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Live now</p>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {liveNow.map((h, i) => (
            <motion.button
              key={h.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onOpenDetail(h.id)}
              className="flex flex-col items-center gap-1.5 shrink-0 w-16"
            >
              <div className="relative">
                <Avatar name={friendName(h.hostId)} color={friends.find((f) => f.id === h.hostId)?.color ?? "bg-gradient-cool"} size={56} />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-warm border-2 border-white flex items-center justify-center text-white">
                  <Icon name={h.icon} size={10} strokeWidth={2.6} />
                </span>
              </div>
              <span className="text-[11px] font-bold text-ink/80 text-center leading-tight truncate w-full">{friendName(h.hostId)}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Notifications feed */}
      <div className="px-5 mt-6">
        <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Recent</p>
        <div className="flex flex-col gap-3">
          {activityNotifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 24 }}
              className="card-surface rounded-xl2 p-3.5 flex items-center gap-3 shadow-card"
            >
              <div className="relative">
                <Avatar name={n.name} color={n.color} size={44} />
                <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${typeMeta[n.type].badge} border-2 border-white flex items-center justify-center text-white`}>
                  <Icon name={typeMeta[n.type].icon} size={11} strokeWidth={2.4} />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink font-semibold leading-snug">
                  <span className="font-bold">{n.name}</span> {n.text}
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
