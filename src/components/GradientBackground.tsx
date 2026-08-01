import SunburstBadge from "./SunburstBadge";
import WaveArt from "./WaveArt";

export default function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden huddle-paper-bg">
      <div className="absolute inset-0 huddle-grain pointer-events-none" />

      <SunburstBadge
        size={230}
        spikes={20}
        color="#DFA82F"
        className="absolute -top-16 -right-16 opacity-[0.14] animate-spinSlow"
      />

      <div className="absolute bottom-0 left-0 right-0 opacity-[0.16]">
        <WaveArt className="w-full h-28" />
      </div>
    </div>
  );
}
