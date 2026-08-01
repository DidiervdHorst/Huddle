import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import BottomNav, { type Screen } from "./components/BottomNav";
import CreateHuddleSheet from "./components/CreateHuddleSheet";
import FreeToast from "./components/FreeToast";
import GradientBackground from "./components/GradientBackground";
import PhoneFrame from "./components/PhoneFrame";
import Logo from "./components/Logo";
import HomeScreen from "./screens/HomeScreen";
import ActivityScreen from "./screens/ActivityScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { groups as initialGroups, type Group, type MoodOption } from "./data/mockData";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [prefillMood, setPrefillMood] = useState<MoodOption | null>(null);
  const [freeToastOpen, setFreeToastOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>(initialGroups);

  const handleMoodTap = (mood: MoodOption) => {
    if (mood.id === "free") {
      setFreeToastOpen(true);
      return;
    }
    setPrefillMood(mood);
    setSheetOpen(true);
  };

  const handleCreateTap = () => {
    setPrefillMood(null);
    setSheetOpen(true);
  };

  const handleCreateGroup = (name: string, memberIds: string[]) => {
    setGroups((prev) => [...prev, { id: `g${prev.length + 1}-${Date.now()}`, name, memberIds }]);
  };

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
            {screen === "home" && <HomeScreen onMoodTap={handleMoodTap} />}
            {screen === "activity" && <ActivityScreen />}
            {screen === "profile" && <ProfileScreen groups={groups} onCreateGroup={handleCreateGroup} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav active={screen} onNavigate={setScreen} onCreate={handleCreateTap} />

      <CreateHuddleSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        prefill={prefillMood}
        groups={groups}
      />
      <FreeToast open={freeToastOpen} onClose={() => setFreeToastOpen(false)} />
    </PhoneFrame>
  );
}

export default App;
