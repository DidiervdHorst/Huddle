import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Confetti from "./Confetti";
import Icon from "./Icon";
import { friends, moodOptions, type Group, type MoodOption } from "../data/mockData";
import { formatHost } from "../lib/formatHost";

interface CreateHuddleSheetProps {
  open: boolean;
  onClose: () => void;
  prefill?: MoodOption | null;
  groups: Group[];
}

const timeOptions = ["Now", "In 30 min", "Tonight", "Pick a time"];

export default function CreateHuddleSheet({ open, onClose, prefill, groups }: CreateHuddleSheetProps) {
  const [text, setText] = useState("");
  const [activity, setActivity] = useState<MoodOption | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [withMe, setWithMe] = useState<string[]>([]);
  const [invited, setInvited] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<"time" | "location" | "with" | "invite" | null>(null);
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
      setWithMe([]);
      setInvited([]);
      setExpanded(null);
    }
  }, [open, prefill]);

  const toggleWithMe = (id: string) => {
    setWithMe((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const toggleInvited = (id: string) => {
    setInvited((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const toggleGroupInvite = (memberIds: string[]) => {
    const allIn = memberIds.every((id) => invited.includes(id));
    setInvited((prev) =>
      allIn ? prev.filter((id) => !memberIds.includes(id)) : [...new Set([...prev, ...memberIds])],
    );
  };

  const handleStart = () => {
    setSuccess(true);
  };

  const withNames = friends.filter((f) => withMe.includes(f.id)).map((f) => f.name);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] z-[60]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="absolute bottom-0 left-0 right-0 z-[70] max-h-[88%] flex flex-col rounded-t-xl3 overflow-hidden paper-panel shadow-floaty"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1.5 rounded-full bg-ink/20" />
            </div>

            {!success ? (
              <div className="px-5 pb-6 pt-2 overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl text-navy-dark">Start a Huddle</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-paper-dark border border-ink/15 flex items-center justify-center text-ink/60"
                  >
                    <Icon name="close" size={14} strokeWidth={2.2} />
                  </motion.button>
                </div>

                <label className="block text-xs font-extrabold text-ink-faint uppercase tracking-wider mb-2">
                  What do you want to do?
                </label>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Coffee, drinks, anything…"
                  className="w-full rounded-xl2 px-4 py-3.5 bg-paper border-2 border-ink/80 text-ink font-bold placeholder:text-ink-faint placeholder:font-semibold focus:outline-none mb-4"
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
                        className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap border-2 border-ink transition-colors ${
                          activity?.id === m.id ? `${m.color} text-paper` : "bg-paper text-ink/70"
                        }`}
                      >
                        <Icon name={m.icon} size={13} strokeWidth={2} />
                        {m.label}
                      </motion.button>
                    ))}
                </div>

                <p className="text-xs font-extrabold text-ink-faint uppercase tracking-wider mb-2">Optional</p>
                <div className="flex flex-col gap-2.5 mb-6">
                  <OptionRow
                    icon="clock"
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
                          className={`px-3.5 py-2 rounded-full text-xs font-extrabold border-2 border-ink ${
                            time === t ? "bg-ink text-paper" : "bg-paper text-ink/70"
                          }`}
                        >
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  </OptionRow>

                  <OptionRow
                    icon="pin"
                    label="Location"
                    value={location || "Nearby"}
                    open={expanded === "location"}
                    onToggle={() => setExpanded(expanded === "location" ? null : "location")}
                  >
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Downtown, my place…"
                      className="mt-3 w-full rounded-xl px-3.5 py-2.5 bg-paper border-2 border-ink/70 text-ink text-sm font-bold placeholder:text-ink-faint placeholder:font-semibold focus:outline-none"
                    />
                  </OptionRow>

                  <OptionRow
                    icon="people"
                    label="Who's with you?"
                    value={withMe.length ? withNames.join(", ") : "Just me"}
                    open={expanded === "with"}
                    onToggle={() => setExpanded(expanded === "with" ? null : "with")}
                  >
                    <p className="text-xs text-ink-faint font-semibold pt-3 pb-1">
                      Tag friends already with you — the huddle will show "you and them" started it.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      {friends.map((f) => (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          key={f.id}
                          onClick={() => toggleWithMe(f.id)}
                          className="flex flex-col items-center gap-1"
                        >
                          <div className="relative">
                            <Avatar name={f.name} color={f.color} size={44} />
                            {withMe.includes(f.id) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal border-2 border-paper flex items-center justify-center text-paper"
                              >
                                <Icon name="check" size={11} strokeWidth={2.6} />
                              </motion.div>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-ink/70">{f.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </OptionRow>

                  <OptionRow
                    icon="chat"
                    label="Invite"
                    value={invited.length ? `${invited.length} invited` : "Everyone sees it"}
                    open={expanded === "invite"}
                    onToggle={() => setExpanded(expanded === "invite" ? null : "invite")}
                  >
                    {groups.length > 0 && (
                      <>
                        <p className="text-[11px] font-extrabold text-ink-faint uppercase tracking-wider pt-3 mb-1.5">
                          Groups
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {groups.map((g) => {
                            const allIn = g.memberIds.every((id) => invited.includes(id));
                            return (
                              <motion.button
                                whileTap={{ scale: 0.92 }}
                                key={g.id}
                                onClick={() => toggleGroupInvite(g.memberIds)}
                                className={`px-3.5 py-2 rounded-full text-xs font-extrabold border-2 border-ink ${
                                  allIn ? "bg-navy text-paper" : "bg-paper text-ink/70"
                                }`}
                              >
                                {g.name}
                              </motion.button>
                            );
                          })}
                        </div>
                      </>
                    )}
                    <p className="text-[11px] font-extrabold text-ink-faint uppercase tracking-wider mt-2 mb-1.5">
                      Friends
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {friends.map((f) => (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          key={f.id}
                          onClick={() => toggleInvited(f.id)}
                          className="flex flex-col items-center gap-1"
                        >
                          <div className="relative">
                            <Avatar name={f.name} color={f.color} size={44} />
                            {invited.includes(f.id) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal border-2 border-paper flex items-center justify-center text-paper"
                              >
                                <Icon name="check" size={11} strokeWidth={2.6} />
                              </motion.div>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-ink/70">{f.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </OptionRow>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97, y: 2, boxShadow: "0 1px 0 rgba(37,29,20,0.85)" }}
                  onClick={handleStart}
                  className="pop w-full py-4 rounded-xl2 bg-coral text-paper font-display text-lg"
                >
                  Start Huddle
                </motion.button>
              </div>
            ) : (
              <SuccessState text={text || "your huddle"} withNames={withNames} onClose={onClose} />
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
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  value: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="paper-card rounded-xl2 px-4 py-3">
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-ink-soft shrink-0">
          <Icon name={icon} size={18} />
          <span className="font-extrabold text-ink text-sm">{label}</span>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs text-ink-faint font-bold truncate">{value}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-ink-faint shrink-0">
            <Icon name="chevron" size={13} />
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

function SuccessState({
  text,
  withNames,
  onClose,
}: {
  text: string;
  withNames: string[];
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="relative px-6 pb-14 pt-6 flex flex-col items-center text-center">
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="pop w-24 h-24 rounded-full flex items-center justify-center bg-teal text-paper"
        >
          <Icon name="check" size={40} strokeWidth={2.6} />
        </motion.div>
        <Confetti count={24} />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="font-display text-2xl text-navy-dark mt-5"
      >
        Huddle started!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="text-ink-soft font-semibold mt-1.5 max-w-[240px]"
      >
        {withNames.length > 0 ? (
          <>
            <span className="text-ink font-extrabold">{formatHost("You", withNames)}</span> just started a huddle
            for <span className="text-ink font-extrabold">{text}</span>
          </>
        ) : (
          <>
            Friends nearby just got a ping about <span className="text-ink font-extrabold">{text}</span>
          </>
        )}
      </motion.p>
    </div>
  );
}
