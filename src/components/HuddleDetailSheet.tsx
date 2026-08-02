import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Avatar from "./Avatar";
import Confetti from "./Confetti";
import Icon from "./Icon";
import { friendColor, friendName, friends, daysUntilDate, type Huddle, type ResponseStatus } from "../data/mockData";
import { formatHost } from "../lib/formatHost";

interface HuddleDetailSheetProps {
  huddle: Huddle | null;
  onClose: () => void;
  onRespond: (huddleId: string, status: ResponseStatus) => void;
  onVote: (huddleId: string, optionId: string) => void;
  onComment: (huddleId: string, text: string) => void;
}

export default function HuddleDetailSheet({ huddle, onClose, onRespond, onVote, onComment }: HuddleDetailSheetProps) {
  const [celebrate, setCelebrate] = useState(false);
  const [commentText, setCommentText] = useState("");

  if (!huddle) return null;
  const isHost = huddle.hostId === "me";
  const joined = friends.filter((f) => huddle.responses[f.id] === "in");
  const maybe = friends.filter((f) => huddle.responses[f.id] === "maybe");
  const cohostNames = huddle.cohostIds.map(friendName);

  const handleRespond = (status: ResponseStatus) => {
    onRespond(huddle.id, status);
    if (status === "in") {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 1000);
    }
  };

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    onComment(huddle.id, commentText.trim());
    setCommentText("");
  };

  return (
    <AnimatePresence>
      {huddle && (
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
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute inset-x-0 bottom-0 top-8 z-[70] flex flex-col rounded-t-xl4 overflow-hidden glass-panel shadow-floaty"
          >
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-ink/15" />
            </div>
            <div className="flex justify-end px-5 pt-1 shrink-0">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-ink/50 shadow-card"
              >
                <Icon name="close" size={14} strokeWidth={2.2} />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6">
              {/* Header */}
              <div className="relative flex flex-col items-center text-center pt-1 pb-5">
                {celebrate && <Confetti count={26} />}
                <div className="w-20 h-20 rounded-full bg-gradient-warm shadow-glow flex items-center justify-center mb-3">
                  <Icon name={huddle.icon} size={36} strokeWidth={1.8} className="text-white" />
                </div>
                <h2 className="font-display text-2xl text-ink leading-tight">{huddle.title}</h2>
                <p className="text-sm text-ink-soft font-semibold mt-1">
                  {formatHost(friendName(huddle.hostId), cohostNames)} · {huddle.timeLabel}
                </p>
              </div>

              {(huddle.location || huddle.description) && (
                <div className="card-surface rounded-xl2 shadow-card p-4 mb-4 flex flex-col gap-2.5">
                  {huddle.location && (
                    <div className="flex items-center gap-2.5 text-ink">
                      <Icon name="pin" size={17} className="text-ink-soft shrink-0" />
                      <span className="text-sm font-bold">{huddle.location}</span>
                    </div>
                  )}
                  {huddle.description && <p className="text-sm text-ink-soft font-semibold leading-relaxed">{huddle.description}</p>}
                </div>
              )}

              {huddle.size === "big" && huddle.countdownDate && (
                <div className="bg-gradient-cool rounded-xl2 shadow-card p-4 mb-4 flex items-center gap-3 text-white">
                  <div className="w-11 h-11 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                    <Icon name="calendar" size={20} />
                  </div>
                  <div>
                    <p className="font-display text-lg leading-tight">{daysUntilDate(huddle.countdownDate)} days to go</p>
                    <p className="text-xs text-white/80 font-semibold">Mark your calendar</p>
                  </div>
                </div>
              )}

              {/* Who's in */}
              <div className="mb-4">
                <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">
                  {joined.length} {joined.length === 1 ? "friend" : "friends"} joining
                </p>
                {joined.length > 0 ? (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {joined.map((f) => (
                      <div key={f.id} className="flex flex-col items-center gap-1">
                        <Avatar name={f.name} color={f.color} size={44} ring />
                        <span className="text-[10px] font-bold text-ink/70">{f.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-ink-faint font-semibold">Be the first to join.</p>
                )}
                {maybe.length > 0 && (
                  <p className="text-xs text-ink-faint font-semibold">
                    <span className="font-bold text-ink-soft">{maybe.map((f) => f.name).join(", ")}</span> might come too
                  </p>
                )}
              </div>

              {huddle.size === "big" && huddle.datePoll && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">When works best?</p>
                  <div className="flex flex-col gap-2">
                    {huddle.datePoll.map((opt) => {
                      const maxVotes = Math.max(...huddle.datePoll!.map((o) => o.votes.length), 1);
                      const pct = (opt.votes.length / maxVotes) * 100;
                      const iVoted = opt.votes.includes("me");
                      return (
                        <button
                          key={opt.id}
                          onClick={() => onVote(huddle.id, opt.id)}
                          className="relative card-surface rounded-xl2 shadow-card p-3.5 text-left overflow-hidden"
                        >
                          <div
                            className="absolute inset-y-0 left-0 bg-lavender-light/50 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                          <div className="relative flex items-center justify-between">
                            <span className="font-bold text-sm text-ink">{opt.label}</span>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${iVoted ? "bg-lavender text-white" : "bg-white text-ink-soft"}`}>
                              {opt.votes.length} vote{opt.votes.length === 1 ? "" : "s"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {huddle.size === "big" && (
                <div className="mb-3">
                  <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Comments</p>
                  <div className="flex flex-col gap-3 mb-3">
                    {(huddle.comments ?? []).map((c) => (
                      <div key={c.id} className="flex items-start gap-2.5">
                        <Avatar name={friendName(c.authorId)} color={friendColor(c.authorId)} size={32} />
                        <div className="flex-1 card-surface rounded-xl2 shadow-card px-3.5 py-2.5">
                          <p className="text-xs font-bold text-ink">{friendName(c.authorId)}</p>
                          <p className="text-sm text-ink-soft font-semibold leading-snug">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment…"
                      className="flex-1 rounded-full px-4 py-2.5 bg-white text-sm font-semibold text-ink placeholder:text-ink-faint focus:outline-none shadow-card"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendComment}
                      className="w-10 h-10 rounded-full bg-gradient-cool text-white flex items-center justify-center shrink-0 shadow-card"
                    >
                      <Icon name="chevron" size={16} className="-rotate-90" />
                    </motion.button>
                  </div>
                </div>
              )}

              {isHost && (
                <div className="mt-2 flex items-center justify-center gap-2 text-ink-faint text-xs font-bold">
                  <Icon name="starburst" size={13} />
                  You're hosting this Huddle
                </div>
              )}
            </div>

            {!isHost && (
              <div className="shrink-0 px-5 pt-3 pb-6 glass-panel border-t border-white/60">
                <p className="text-center text-[11px] font-bold text-ink-faint uppercase tracking-wider mb-2.5">
                  No pressure — just let them know
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  <RespondButton
                    active={huddle.myResponse === "in"}
                    label="I'm in"
                    activeClass="bg-gradient-mint text-white shadow-glow"
                    onClick={() => handleRespond("in")}
                  />
                  <RespondButton
                    active={huddle.myResponse === "maybe"}
                    label="Maybe"
                    activeClass="bg-gradient-sun text-ink shadow-pop"
                    onClick={() => handleRespond("maybe")}
                  />
                  <RespondButton
                    active={huddle.myResponse === "not"}
                    label="Not this time"
                    activeClass="bg-ink/80 text-white"
                    onClick={() => handleRespond("not")}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function RespondButton({
  active,
  label,
  activeClass,
  onClick,
}: {
  active: boolean;
  label: string;
  activeClass: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`py-3 rounded-xl2 text-xs font-bold transition-colors ${active ? activeClass : "bg-white text-ink/70 shadow-card"}`}
    >
      {label}
    </motion.button>
  );
}
