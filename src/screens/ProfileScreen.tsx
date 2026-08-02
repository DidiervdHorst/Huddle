import { motion } from "framer-motion";
import { useState } from "react";
import Avatar from "../components/Avatar";
import CreateGroupSheet from "../components/CreateGroupSheet";
import Icon from "../components/Icon";
import { currentUser, friends, type Group } from "../data/mockData";

interface ProfileScreenProps {
  groups: Group[];
  onCreateGroup: (name: string, memberIds: string[]) => void;
}

export default function ProfileScreen({ groups, onCreateGroup }: ProfileScreenProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar pb-32">
      <div className="px-5 pt-20 pb-2 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative"
        >
          <Avatar name={currentUser.name} color={currentUser.avatarColor} size={92} ring />
        </motion.div>
        <h1 className="font-display text-3xl text-ink mt-3">{currentUser.name}</h1>
        <p className="text-ink-soft font-semibold text-sm mt-0.5">Always down for something spontaneous</p>
      </div>

      {/* Interests */}
      <div className="px-5 mt-7">
        <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Interests</p>
        <div className="flex flex-wrap gap-2">
          {currentUser.interests.map((interest, i) => (
            <motion.span
              key={interest}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="px-3.5 py-2 rounded-xl2 card-surface text-xs font-bold text-ink/80 shadow-card"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Favorite activities */}
      <div className="px-5 mt-7">
        <p className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-2.5">Favorite activities</p>
        <div className="grid grid-cols-4 gap-2.5">
          {currentUser.favoriteActivities.map((act, i) => (
            <motion.div
              key={act.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-surface rounded-xl2 py-3.5 flex items-center justify-center shadow-card text-ink-soft"
              title={act.label}
            >
              <Icon name={act.icon} size={22} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Groups */}
      <div className="px-5 mt-7">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs font-bold text-ink-faint uppercase tracking-wider">Friend groups</p>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-1 text-xs font-bold text-lavender-dark"
          >
            <Icon name="plus" size={13} strokeWidth={2.6} />
            New group
          </motion.button>
        </div>
        <div className="flex flex-col gap-2">
          {groups.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card-surface rounded-xl2 px-3.5 py-3 flex items-center gap-3 shadow-card"
            >
              <div className="flex -space-x-2.5 shrink-0">
                {g.memberIds.slice(0, 3).map((id) => {
                  const f = friends.find((fr) => fr.id === id);
                  if (!f) return null;
                  return <Avatar key={id} name={f.name} color={f.color} size={34} ring />;
                })}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-ink">{g.name}</p>
                <p className="text-[11px] text-ink-faint font-bold">{g.memberIds.length} friends</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Friends */}
      <div className="px-5 mt-7">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs font-bold text-ink-faint uppercase tracking-wider">Friends</p>
          <span className="text-xs font-bold text-lavender-dark">{friends.length}</span>
        </div>
        <div className="flex flex-col gap-2">
          {friends.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card-surface rounded-xl2 px-3.5 py-2.5 flex items-center gap-3 shadow-card"
            >
              <Avatar name={f.name} color={f.color} size={40} />
              <span className="font-bold text-sm text-ink flex-1">{f.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <CreateGroupSheet open={sheetOpen} onClose={() => setSheetOpen(false)} onCreate={onCreateGroup} />
    </div>
  );
}
