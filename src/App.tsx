import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import BottomNav, { type Screen } from "./components/BottomNav";
import CreateHuddleSheet, { type CreatePrefill } from "./components/CreateHuddleSheet";
import HuddleDetailSheet from "./components/HuddleDetailSheet";
import GradientBackground from "./components/GradientBackground";
import PhoneFrame from "./components/PhoneFrame";
import Logo from "./components/Logo";
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import HuddlesScreen from "./screens/HuddlesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import type { IconName } from "./components/Icon";
import { groups as initialGroups, huddles as initialHuddles, type Group, type Huddle, type ResponseStatus } from "./data/mockData";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [prefill, setPrefill] = useState<CreatePrefill>(null);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [huddles, setHuddles] = useState<Huddle[]>(initialHuddles);
  const [detailId, setDetailId] = useState<string | null>(null);

  const openCreate = (p: CreatePrefill) => {
    setPrefill(p);
    setSheetOpen(true);
  };

  const handleCreateGroup = (name: string, memberIds: string[]) => {
    setGroups((prev) => [...prev, { id: `g${prev.length + 1}-${Date.now()}`, name, memberIds }]);
  };

  const handleCreateHuddle = (data: Omit<Huddle, "id" | "responses">) => {
    setHuddles((prev) => [{ ...data, id: `h-${Date.now()}`, responses: {} }, ...prev]);
  };

  const handleRespond = (id: string, status: ResponseStatus) => {
    setHuddles((prev) => prev.map((h) => (h.id === id ? { ...h, myResponse: status } : h)));
  };

  const handleVote = (id: string, optionId: string) => {
    setHuddles((prev) =>
      prev.map((h) => {
        if (h.id !== id || !h.datePoll) return h;
        return {
          ...h,
          datePoll: h.datePoll.map((opt) => {
            const has = opt.votes.includes("me");
            if (opt.id === optionId) {
              return { ...opt, votes: has ? opt.votes.filter((v) => v !== "me") : [...opt.votes, "me"] };
            }
            return { ...opt, votes: opt.votes.filter((v) => v !== "me") };
          }),
        };
      }),
    );
  };

  const handleComment = (id: string, text: string) => {
    setHuddles((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, comments: [...(h.comments ?? []), { id: `c-${Date.now()}`, authorId: "me", text, time: "Just now" }] }
          : h,
      ),
    );
  };

  const detailHuddle = huddles.find((h) => h.id === detailId) ?? null;

  return (
    <PhoneFrame>
      <GradientBackground />

      {/* Top bar with logo */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center pt-6 pointer-events-none safe-top">
        <div className="pointer-events-auto">
          <Logo size="sm" />
        </div>
      </div>

      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {screen === "home" && (
              <HomeScreen
                huddles={huddles}
                onStartActivity={(activityId) => openCreate({ kind: "activity", activityId })}
                onStartOpen={() => openCreate({ kind: "open" })}
                onOpenDetail={setDetailId}
                onQuickJoin={(id) => handleRespond(id, "in")}
                onViewCalendar={() => setScreen("calendar")}
              />
            )}
            {screen === "calendar" && (
              <CalendarScreen
                huddles={huddles}
                onOpenDetail={setDetailId}
                onStartCustom={(title, icon) => openCreate({ kind: "activity", customTitle: title, customIcon: icon as IconName })}
              />
            )}
            {screen === "huddles" && <HuddlesScreen huddles={huddles} onOpenDetail={setDetailId} onRespond={handleRespond} />}
            {screen === "profile" && <ProfileScreen groups={groups} onCreateGroup={handleCreateGroup} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav active={screen} onNavigate={setScreen} onCreate={() => openCreate(null)} />

      <CreateHuddleSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        prefill={prefill}
        groups={groups}
        onCreate={handleCreateHuddle}
      />

      <HuddleDetailSheet
        huddle={detailHuddle}
        onClose={() => setDetailId(null)}
        onRespond={handleRespond}
        onVote={handleVote}
        onComment={handleComment}
      />
    </PhoneFrame>
  );
}

export default App;
