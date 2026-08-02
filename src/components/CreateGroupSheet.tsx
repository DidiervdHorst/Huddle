import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Icon from "./Icon";
import { friends, type Friend } from "../data/mockData";

interface CreateGroupSheetProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, memberIds: string[]) => void;
}

const swatches = ["bg-gradient-warm", "bg-gradient-cool", "bg-gradient-mint", "bg-gradient-sun", "bg-gradient-berry", "bg-gradient-ocean"];

export default function CreateGroupSheet({ open, onClose, onCreate }: CreateGroupSheetProps) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setName("");
      setSelected([]);
    }
  }, [open]);

  const toggle = (f: Friend) => {
    setSelected((prev) => (prev.includes(f.id) ? prev.filter((id) => id !== f.id) : [...prev, f.id]));
  };

  const canCreate = name.trim().length > 0 && selected.length > 0;

  const handleCreate = () => {
    if (!canCreate) return;
    onCreate(name.trim(), selected);
    onClose();
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
            className="absolute bottom-0 left-0 right-0 z-[70] max-h-[85%] flex flex-col rounded-t-xl4 overflow-hidden glass-panel shadow-floaty"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1.5 rounded-full bg-ink/15" />
            </div>

            <div className="px-5 pb-6 pt-2 overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl text-ink">New Group</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-ink/50 shadow-card"
                >
                  <Icon name="close" size={14} strokeWidth={2.2} />
                </motion.button>
              </div>

              <label className="block text-xs font-bold text-ink-faint uppercase tracking-wider mb-2">Group name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Best Friends, Volleyball…"
                className="w-full rounded-xl2 px-4 py-3.5 card-surface text-ink font-bold placeholder:text-ink-faint placeholder:font-semibold focus:outline-none mb-5 shadow-card"
              />

              <label className="block text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Members</label>
              <div className="flex flex-wrap gap-3 mb-6">
                {friends.map((f) => (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    key={f.id}
                    onClick={() => toggle(f)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="relative">
                      <Avatar name={f.name} color={f.color} size={48} />
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
                ))}
              </div>

              <motion.button
                whileTap={canCreate ? { scale: 0.97 } : undefined}
                onClick={handleCreate}
                disabled={!canCreate}
                className={`w-full py-4 rounded-xl2 font-display text-lg text-white transition-opacity ${
                  canCreate ? `${swatches[selected.length % swatches.length]} shadow-glow` : "bg-ink/15 text-ink-faint"
                }`}
              >
                Create Group
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
