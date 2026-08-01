export type Availability = "free" | "maybe" | "busy";

export interface Friend {
  id: string;
  name: string;
  emoji: string;
  color: string;
  availability: Availability;
}

export interface HuddleCard {
  id: string;
  name: string;
  avatarEmoji: string;
  avatarColor: string;
  activityEmoji: string;
  activityLabel: string;
  status: string;
  joinedCount: number;
  joinedAvatars: string[];
  kind: "join" | "message";
  cta: "JOIN" | "MESSAGE";
}

export const currentUser = {
  name: "Mayra",
  avatarEmoji: "🦋",
  avatarColor: "from-lavender to-coral",
  availability: "free" as Availability,
  interests: ["Coffee walks", "Live music", "Board games", "Beach days", "Brunch"],
  favoriteActivities: ["☕ Coffee", "🍕 Dinner", "🎲 Games", "🚶 Walk"],
};

export const friends: Friend[] = [
  { id: "f1", name: "Lisa", emoji: "🌸", color: "from-mint to-sky", availability: "free" },
  { id: "f2", name: "Mark", emoji: "🎸", color: "from-peach to-coral", availability: "free" },
  { id: "f3", name: "Sophie", emoji: "✨", color: "from-lavender to-sky", availability: "free" },
  { id: "f4", name: "Theo", emoji: "🛹", color: "from-coral to-peach", availability: "maybe" },
  { id: "f5", name: "Amara", emoji: "🌊", color: "from-sky to-mint", availability: "busy" },
  { id: "f6", name: "Jonas", emoji: "🔥", color: "from-coral to-lavender", availability: "free" },
  { id: "f7", name: "Nina", emoji: "🍀", color: "from-mint to-lavender", availability: "maybe" },
];

export const huddleFeed: HuddleCard[] = [
  {
    id: "h1",
    name: "Lisa",
    avatarEmoji: "🌸",
    avatarColor: "from-mint to-sky",
    activityEmoji: "☕",
    activityLabel: "Coffee nearby",
    status: "Available now",
    joinedCount: 2,
    joinedAvatars: ["🎸", "✨"],
    kind: "join",
    cta: "JOIN",
  },
  {
    id: "h2",
    name: "Mark",
    avatarEmoji: "🎸",
    avatarColor: "from-peach to-coral",
    activityEmoji: "🍻",
    activityLabel: "Drinks tonight",
    status: "Starts 20:00",
    joinedCount: 3,
    joinedAvatars: ["🌸", "🛹", "🔥"],
    kind: "join",
    cta: "JOIN",
  },
  {
    id: "h3",
    name: "Sophie",
    avatarEmoji: "✨",
    avatarColor: "from-lavender to-sky",
    activityEmoji: "🟢",
    activityLabel: "Just hanging",
    status: "Open for ideas",
    joinedCount: 0,
    joinedAvatars: [],
    kind: "message",
    cta: "MESSAGE",
  },
  {
    id: "h4",
    name: "Jonas",
    avatarEmoji: "🔥",
    avatarColor: "from-coral to-lavender",
    activityEmoji: "🏃",
    activityLabel: "Evening run",
    status: "Starts 18:30",
    joinedCount: 1,
    joinedAvatars: ["🍀"],
    kind: "join",
    cta: "JOIN",
  },
  {
    id: "h5",
    name: "Nina",
    avatarEmoji: "🍀",
    avatarColor: "from-mint to-lavender",
    activityEmoji: "🎬",
    activityLabel: "Movie night",
    status: "Starts 21:00",
    joinedCount: 4,
    joinedAvatars: ["🌸", "🎸", "✨", "🛹"],
    kind: "join",
    cta: "JOIN",
  },
];

export interface MoodOption {
  id: string;
  label: string;
  emoji: string;
  gradient: string;
}

export const moodOptions: MoodOption[] = [
  { id: "free", label: "I'm free", emoji: "🟢", gradient: "from-mint to-sky" },
  { id: "drinks", label: "Drinks", emoji: "🍻", gradient: "from-coral to-peach" },
  { id: "coffee", label: "Coffee", emoji: "☕", gradient: "from-peach to-lavender" },
  { id: "dinner", label: "Dinner", emoji: "🍕", gradient: "from-coral to-lavender" },
  { id: "walk", label: "Walk", emoji: "🚶", gradient: "from-mint to-lavender" },
  { id: "sport", label: "Sport", emoji: "🏃", gradient: "from-sky to-mint" },
  { id: "games", label: "Games", emoji: "🎲", gradient: "from-lavender to-sky" },
  { id: "movie", label: "Movie", emoji: "🎬", gradient: "from-lavender to-coral" },
  { id: "other", label: "Something else", emoji: "➕", gradient: "from-sky to-peach" },
];

export interface ActivityNotification {
  id: string;
  type: "joined" | "message" | "started";
  name: string;
  emoji: string;
  color: string;
  text: string;
  time: string;
}

export const activityNotifications: ActivityNotification[] = [
  {
    id: "a1",
    type: "joined",
    name: "Lisa",
    emoji: "🌸",
    color: "from-mint to-sky",
    text: "joined your Coffee huddle",
    time: "2m ago",
  },
  {
    id: "a2",
    type: "message",
    name: "Sophie",
    emoji: "✨",
    color: "from-lavender to-sky",
    text: "sent you a message: \"down for anything tbh\"",
    time: "12m ago",
  },
  {
    id: "a3",
    type: "started",
    name: "Mark",
    emoji: "🎸",
    color: "from-peach to-coral",
    text: "started Drinks tonight",
    time: "25m ago",
  },
  {
    id: "a4",
    type: "joined",
    name: "Theo",
    emoji: "🛹",
    color: "from-coral to-peach",
    text: "and 2 others joined Movie night",
    time: "1h ago",
  },
  {
    id: "a5",
    type: "joined",
    name: "Nina",
    emoji: "🍀",
    color: "from-mint to-lavender",
    text: "joined your Evening run",
    time: "3h ago",
  },
];
