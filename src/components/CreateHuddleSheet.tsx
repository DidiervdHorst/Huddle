import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Avatar from "./Avatar";
import Confetti from "./Confetti";
import Icon, { type IconName } from "./Icon";
import {
  activityOptions,
  friends,
  timeOptions,
  type ActivityOption,
  type Group,
  type Huddle,
} from "../data/mockData";
import { formatHost } from "../lib/formatHost";

export type CreatePrefill =
  | { kind: "activity"; activityId?: string; customTitle?: string; customIcon?: IconName }
  | { kind: "open" }
  | null;

interface CreateHuddleSheetProps {
  open: boolean;
  onClose: () => void;
  prefill?: CreatePrefill;
  groups: Group[];
  onCreate: (huddle: Omit<Huddle, "id" | "responses">) => void;
}

export default function CreateHuddleSheet({ open, onClose, prefill, groups, onCreate }: CreateHuddleSheetProps) {
  const [kind, setKind] = useState<"activity" | "open">("activity");
  const [activity, setActivity] = useState<ActivityOption | null>(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [cohosts, setCohosts] = useState<string[]>([]);
  const [invited, setInvited] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<"time" | "details" | "with" | "invite" | null>(null);
  const [success, setSuccess] = useState(false);
  const [iconOverride, setIconOverride] = useState<IconName | null>(null);

  useEffect(() => {
    if (!open) return;
    setSuccess(false);
    setTime(null);
    setLocation("");
    setDescription("");
    setNote("");
    setCohosts([]);
    setInvited([]);
    setExpanded(null);
    setIconOverride(null);

    if (prefill?.kind === "open") {
      setKind("open");
      setActivity(null);
      setTitle("I'm free");
    } else if (prefill?.kind === "activity" && prefill.activityId) {
      const found = activityOptions.find((a) => a.id === prefill.activityId) ?? null;
      setKind("activity");
      setActivity(found);
      setTitle(found?.label ?? "");
    } else if (prefill?.kind === "activity" && prefill.customTitle) {
      setKind("activity");
      setActivity(null);
      setTitle(prefill.customTitle);
      setIconOverride(prefill.customIcon ?? null);
    } else {
      setKind("activity");
      setActivity(null);
      setTitle("");
    }
  }, [open, prefill]);

  const isBusyAt = (friendId: string) => {
    if (!time) return false;
    return friends.find((f) => f.id === friendId)?.busy.includes(time) ?? false;
  };

  const toggleCohost = (id: string) => {
    setCohosts((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const toggleInvited = (id: string) => {
    setInvited((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const toggleGroupInvite = (memberIds: string[]) => {
    const allIn = memberIds.every((id) => invited.includes(id));
    setInvited((prev) => (allIn ? prev.filter((id) => !memberIds.includes(id)) : [...new Set([...prev, ...memberIds])]));
  };

  const canStart = kind === "open" || title.trim().length > 0;

  const handleStart = () => {
    if (!canStart) return;
    const finalTitle = kind === "open" ? "I'm free" : title.trim();
    const icon: IconName = kind === "open" ? "sun" : activity?.icon ?? iconOverride ?? "starburst";
    onCreate({
      size: "small",
      kind,
      title: finalTitle,
      icon,
      hostId: "me",
      cohostIds: cohosts,
      timeLabel: time ?? "Anytime",
      location: location || undefined,
      description: (kind === "open" ? note : description) || undefined,
      invitedIds: invited,
    });
    setSuccess(true);
  };

  const cohostNames = useMemo(
    () => friends.filter((f) => cohosts.includes(f.id)).map((f) => f.name),
    [cohosts],
  );

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
            className="absolute bottom-0 left-0 right-0 z-[70] max-h-[90%] flex flex-col rounded-t-xl4 overflow-hidden glass-panel shadow-floaty"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1.5 rounded-full bg-ink/15" />
            </div>

            {!success ? (
              <div className="px-5 pb-6 pt-2 overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl text-ink">Start a Huddle</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-ink/50 shadow-card"
                  >
                    <Icon name="close" size={14} strokeWidth={2.2} />
                  </motion.button>
                </div>

                {/* Kind toggle */}
                <div className="flex p-1 rounded-full bg-ink/5 mb-5">
                  <SegButton active={kind === "activity"} onClick={() => setKind("activity")} label="I have an idea" />
                  <SegButton active={kind === "open"} onClick={() => setKind("open")} label="Just want company" />
                </div>

                {kind === "activity" ? (
                  <>
                    <label className="block text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">
                      What are you up for?
                    </label>
                    <div className="grid grid-cols-3 gap-2.5 mb-5">
                      {activityOptions.map((a) => (
                        <motion.button
                          key={a.id}
                          whileTap={{ scale: 0.93 }}
                          onClick={() => {
                            setActivity(a);
                            setTitle(a.label);
                          }}
                          className={`flex flex-col items-center justify-center gap-1.5 rounded-xl2 py-3.5 transition-all ${
                            activity?.id === a.id ? `${a.color} shadow-pop` : "card-surface shadow-card"
                          }`}
                        >
                          <Icon name={a.icon} size={22} strokeWidth={2} className={activity?.id === a.id ? "text-white" : "text-ink-soft"} />
                          <span className={`text-[10px] font-bold text-center leading-tight px-1 ${activity?.id === a.id ? "text-white" : "text-ink/70"}`}>
                            {a.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Name your Huddle…"
                      className="w-full rounded-xl2 px-4 py-3.5 card-surface text-ink font-bold placeholder:text-ink-faint placeholder:font-semibold focus:outline-none mb-5 shadow-card"
                    />
                  </>
                ) : (
                  <div className="rounded-xl2 card-surface shadow-card p-4 mb-5">
                    <p className="text-sm text-ink-soft font-semibold mb-3">
                      No plan needed — this is a low-key ping. Friends can suggest ideas or just show up.
                    </p>
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. Free this afternoon, up for anything…"
                      className="w-full rounded-xl px-3.5 py-2.5 bg-white text-ink text-sm font-bold placeholder:text-ink-faint placeholder:font-semibold focus:outline-none"
                    />
                  </div>
                )}

                <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2">Optional</p>
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
                          whileTap={{ scale: 0.94 }}
                          key={t}
                          onClick={() => setTime(time === t ? null : t)}
                          className={`px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${
                            time === t ? "bg-ink text-white" : "bg-white text-ink/70"
                          }`}
                        >
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  </OptionRow>

                  <OptionRow
                    icon="pin"
                    label="Location & details"
                    value={location || "Add later"}
                    open={expanded === "details"}
                    onToggle={() => setExpanded(expanded === "details" ? null : "details")}
                  >
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Downtown, my place…"
                      className="mt-3 w-full rounded-xl px-3.5 py-2.5 bg-white text-ink text-sm font-bold placeholder:text-ink-faint placeholder:font-semibold focus:outline-none"
                    />
                    {kind === "activity" && (
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Anything else? (optional)"
                        rows={2}
                        className="mt-2 w-full rounded-xl px-3.5 py-2.5 bg-white text-ink text-sm font-semibold placeholder:text-ink-faint placeholder:font-semibold focus:outline-none resize-none"
                      />
                    )}
                  </OptionRow>

                  <OptionRow
                    icon="people"
                    label="Who's with you?"
                    value={cohosts.length ? cohostNames.join(", ") : "Just you"}
                    open={expanded === "with"}
                    onToggle={() => setExpanded(expanded === "with" ? null : "with")}
                  >
                    <p className="text-xs text-ink-faint font-semibold pt-3 pb-1">
                      Tag friends already with you — the Huddle will show it's from both of you.
                    </p>
                    <FriendPicker friends={friends} selected={cohosts} onToggle={toggleCohost} greyed={() => false} />
                  </OptionRow>

                  <OptionRow
                    icon="chat"
                    label="Send to"
                    value={invited.length ? `${invited.length} friends` : "Choose friends or a group"}
                    open={expanded === "invite"}
                    onToggle={() => setExpanded(expanded === "invite" ? null : "invite")}
                  >
                    {groups.length > 0 && (
                      <>
                        <p className="text-[11px] font-bold text-ink-faint uppercase tracking-wider pt-3 mb-1.5">Groups</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {groups.map((g) => {
                            const allIn = g.memberIds.every((id) => invited.includes(id));
                            return (
                              <motion.button
                                whileTap={{ scale: 0.94 }}
                                key={g.id}
                                onClick={() => toggleGroupInvite(g.memberIds)}
                                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${
                                  allIn ? "bg-gradient-cool text-white" : "bg-white text-ink/70"
                                }`}
                              >
                                {g.name}
                              </motion.button>
                            );
                          })}
                        </div>
                      </>
                    )}
                    <p className="text-[11px] font-bold text-ink-faint uppercase tracking-wider mt-1 mb-1.5">Friends</p>
                    <FriendPicker friends={friends} selected={invited} onToggle={toggleInvited} greyed={isBusyAt} />
                  </OptionRow>
                </div>

                <motion.button
                  whileTap={canStart ? { scale: 0.97 } : undefined}
                  onClick={handleStart}
                  disabled={!canStart}
                  className={`w-full py-4 rounded-xl2 font-display text-lg text-white transition-opacity ${
                    canStart ? "bg-gradient-warm shadow-glow" : "bg-ink/15 text-ink-faint"
                  }`}
                >
                  {kind === "open" ? "Send it" : "Start Huddle"}
                </motion.button>
              </div>
            ) : (
              <SuccessState
                kind={kind}
                text={kind === "open" ? "I'm free" : title || "your huddle"}
                cohostNames={cohostNames}
                onClose={onClose}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SegButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="relative flex-1 py-2.5 rounded-full">
      {active && (
        <motion.div layoutId="seg-pill" className="absolute inset-0 bg-white shadow-card rounded-full" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
      )}
      <span className={`relative text-xs font-bold ${active ? "text-ink" : "text-ink-faint"}`}>{label}</span>
    </button>
  );
}

function FriendPicker({
  friends: list,
  selected,
  onToggle,
  greyed,
}: {
  friends: { id: string; name: string; color: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  greyed: (id: string) => boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3 pt-1">
      {list.map((f) => {
        const isGreyed = greyed(f.id);
        return (
          <motion.button
            whileTap={{ scale: 0.9 }}
            key={f.id}
            onClick={() => onToggle(f.id)}
            className={`flex flex-col items-center gap-1 ${isGreyed ? "opacity-35 grayscale" : ""}`}
          >
            <div className="relative">
              <Avatar name={f.name} color={f.color} size={46} />
              {selected.includes(f.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-mint-dark border-2 border-white flex items-center justify-center text-white"
                >
                  <Icon name="check" size={11} strokeWidth={2.6} />
                </motion.div>
              )}
            </div>
            <span className="text-[10px] font-bold text-ink/70">{f.name}</span>
          </motion.button>
        );
      })}
    </div>
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
    <div className="card-surface rounded-xl2 px-4 py-3 shadow-card">
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-ink-soft shrink-0">
          <Icon name={icon} size={18} />
          <span className="font-bold text-ink text-sm">{label}</span>
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
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({
  kind,
  text,
  cohostNames,
  onClose,
}: {
  kind: "activity" | "open";
  text: string;
  cohostNames: string[];
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
          className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-mint text-white shadow-glow"
        >
          <Icon name="check" size={40} strokeWidth={2.6} />
        </motion.div>
        <Confetti count={24} />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="font-display text-2xl text-ink mt-5"
      >
        {kind === "open" ? "You're out there!" : "Huddle started!"}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="text-ink-soft font-semibold mt-1.5 max-w-[240px]"
      >
        {cohostNames.length > 0 ? (
          <>
            <span className="text-ink font-bold">{formatHost("You", cohostNames)}</span> just sent{" "}
            <span className="text-ink font-bold">{text}</span> to your friends
          </>
        ) : kind === "open" ? (
          <>
            Friends now know you're free — no pressure, no plan, just an open door.
          </>
        ) : (
          <>
            Friends nearby just got a ping about <span className="text-ink font-bold">{text}</span>
          </>
        )}
      </motion.p>
    </div>
  );
}
