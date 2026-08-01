import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Confetti from "./Confetti";
import { friends, moodOptions, type MoodOption } from "../data/mockData";

interface CreateHuddleSheetProps {
  open: boolean;
  onClose: () => void;
  prefill?: MoodOption | null;
}

const timeOptions = ["Now", "In 30 min", "Tonight", "Pick a time"];

export default function CreateHuddleSheet({ open, onClose, prefill }: CreateHuddleSheetProps) {
  const [text, setText] = useState("");
  const [activity, setActivity] = useState<MoodOption | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<"time" | "location" | "friends" | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setSuccess(false);
      if (prefill) {
        setActivity(prefill);
        setText(prefill.id === "free" ? "" : prefill.label);
      } else {
        setActivity(null);
        setText("");
      }
      setTime(null);
      setLocation("");
      setSelectedFriends([]);
      setExpanded(null);
    }
  }, [open, prefill]);

  const toggleFriend = (id: string) => {
    setSelectedFriends((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const handleStart = () => {
    setSuccess(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="absolute bottom-0 left-0 right-0 z-[70] max-h-[88%] flex flex-col rounded-t-xl3 overflow-hidden glass-strong shadow-glass"
          >
            <div className="huddle-gradient-bg absolute inset-0 opacity-40 -z-10" />
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1.5 rounded-full bg-ink/15" />
            </div>

            {!success ? (
              <div className="px-5 pb-6 pt-2 overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-xl text-ink">Start a Huddle</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-ink/60 text-sm font-bold"
                  >
                    ✕
                  </motion.button>
                </div>

                <label className="block text-xs font-bold text-muted uppercase tracking-wide mb-2">
                  What do you want to do?
                </label>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Coffee, drinks, anything…"
                  className="w-full rounded-2xl px-4 py-3.5 bg-white/80 border border-white/70 text-ink font-semibold placeholder:text-muted/70 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-lavender-dark/50 mb-4"
                />

                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-5 -mx-1 px-1">
                  {moodOptions
                    .filter((m) => m.id !== "free")
                    .map((m) => (
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        key={m.id}
                        onClick={() => {
                          setActivity(m);
                          setText(m.label);
                        }}
                        className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                          activity?.id === m.id
                            ? "text-white shadow-sm"
                            : "bg-white/70 text-ink/70"
                        }`}
                        style={
                          activity?.id === m.id
                            ? { background: "linear-gradient(135deg, #FF9B85, #C7B3F5)" }
                            : undefined
                        }
                      >
                        <span>{m.emoji}</span>
                        {m.label}
                      </motion.button>
                    ))}
                </div>

                <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2">Optional</p>
                <div className="flex flex-col gap-2.5 mb-6">
                  <OptionRow
                    icon="🕐"
                    label="Time"
                    value={time ?? "Anytime"}
                    open={expanded === "time"}
                    onToggle={() => setExpanded(expanded === "time" ? null : "time")}
                  >
                    <div className="flex flex-wrap gap-2 pt-3">
                      {timeOptions.map((t) => (
                        <motion.button
                          whileTap={{ scale: 0.92 }}
                          key={t}
                          onClick={() => setTime(t)}
                          className={`px-3.5 py-2 rounded-full text-xs font-bold ${
                            time === t ? "bg-ink text-white" : "bg-white/70 text-ink/70"
                          }`}
                        >
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  </OptionRow>

                  <OptionRow
                    icon="📍"
                    label="Location"
                    value={location || "Nearby"}
                    open={expanded === "location"}
                    onToggle={() => setExpanded(expanded === "location" ? null : "location")}
                  >
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Downtown, my place…"
                      className="mt-3 w-full rounded-xl px-3.5 py-2.5 bg-white/80 border border-white/70 text-ink text-sm font-semibold placeholder:text-muted/70 placeholder:font-medium focus:outline-none"
                    />
                  </OptionRow>

                  <OptionRow
                    icon="👥"
                    label="Friends"
                    value={selectedFriends.length ? `${selectedFriends.length} invited` : "Everyone sees it"}
                    open={expanded === "friends"}
                    onToggle={() => setExpanded(expanded === "friends" ? null : "friends")}
                  >
                    <div className="flex flex-wrap gap-3 pt-3">
                      {friends.map((f) => (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          key={f.id}
                          onClick={() => toggleFriend(f.id)}
                          className="flex flex-col items-center gap-1"
                        >
                          <div className="relative">
                            <Avatar emoji={f.emoji} gradient={f.color} size={44} />
                            {selectedFriends.includes(f.id) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-mint-dark ring-2 ring-white flex items-center justify-center text-white text-[10px] font-bold"
                              >
                                ✓
                              </motion.div>
                            )}
                          </div>
                          <span className="text-[10px] font-semibold text-ink/70">{f.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </OptionRow>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleStart}
                  className="w-full py-4 rounded-full text-white font-display font-bold text-lg shadow-floaty"
                  style={{ background: "linear-gradient(135deg, #FF9B85 0%, #C7B3F5 55%, #7EC2E8 100%)" }}
                >
                  Start Huddle 🚀
                </motion.button>
              </div>
            ) : (
              <SuccessState text={text || "your huddle"} onClose={onClose} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function OptionRow({
  icon,
  label,
  value,
  open,
  onToggle,
  children,
}: {
  icon: string;
  label: string;
  value: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/60 rounded-2xl px-4 py-3 border border-white/60">
      <button onClick={onToggle} className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{icon}</span>
          <span className="font-bold text-ink text-sm">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted font-semibold">{value}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            className="text-muted text-xs"
          >
            ▾
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({ text, onClose }: { text: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="relative px-6 pb-14 pt-6 flex flex-col items-center text-center">
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-floaty"
          style={{ background: "linear-gradient(135deg, #8FE8C4, #A8D8F0)" }}
        >
          🎉
        </motion.div>
        <Confetti count={26} />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="font-display font-bold text-2xl text-ink mt-5"
      >
        Huddle started!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="text-muted font-medium mt-1.5 max-w-[240px]"
      >
        Friends nearby just got a ping about <span className="text-ink font-bold">{text}</span>
      </motion.p>
    </div>
  );
}
