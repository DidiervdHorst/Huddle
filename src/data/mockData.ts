import type { IconName } from "../components/Icon";

export type Availability = "free" | "maybe" | "busy";

export interface Friend {
  id: string;
  name: string;
  color: string;
  availability: Availability;
}

export interface HuddleCard {
  id: string;
  name: string;
  avatarColor: string;
  activityIcon: IconName;
  activityLabel: string;
  status: string;
  joinedCount: number;
  joinedNames: string[];
  kind: "join" | "message";
  cta: "JOIN" | "MESSAGE";
}

export const currentUser = {
  name: "Mayra",
  avatarColor: "bg-ocean-dark",
  availability: "free" as Availability,
  interests: ["Coffee walks", "Live music", "Board games", "Beach days", "Brunch"],
  favoriteActivities: [
    { icon: "coffee" as IconName, label: "Coffee" },
    { icon: "pizza" as IconName, label: "Dinner" },
    { icon: "dice" as IconName, label: "Games" },
    { icon: "footprints" as IconName, label: "Walk" },
  ],
};

export const friends: Friend[] = [
  { id: "f1", name: "Lisa", color: "bg-rust", availability: "free" },
  { id: "f2", name: "Mark", color: "bg-ocean", availability: "free" },
  { id: "f3", name: "Sophie", color: "bg-gold-dark", availability: "free" },
  { id: "f4", name: "Theo", color: "bg-olive", availability: "maybe" },
  { id: "f5", name: "Amara", color: "bg-coral-dark", availability: "busy" },
  { id: "f6", name: "Jonas", color: "bg-ocean-dark", availability: "free" },
  { id: "f7", name: "Nina", color: "bg-rust-dark", availability: "maybe" },
];

export const huddleFeed: HuddleCard[] = [
  {
    id: "h1",
    name: "Lisa",
    avatarColor: "bg-rust",
    activityIcon: "coffee",
    activityLabel: "Coffee nearby",
    status: "Available now",
    joinedCount: 2,
    joinedNames: ["Mark", "Sophie"],
    kind: "join",
    cta: "JOIN",
  },
  {
    id: "h2",
    name: "Mark",
    avatarColor: "bg-ocean",
    activityIcon: "drink",
    activityLabel: "Drinks tonight",
    status: "Starts 20:00",
    joinedCount: 3,
    joinedNames: ["Lisa", "Theo", "Jonas"],
    kind: "join",
    cta: "JOIN",
  },
  {
    id: "h3",
    name: "Sophie",
    avatarColor: "bg-gold-dark",
    activityIcon: "sun",
    activityLabel: "Just hanging",
    status: "Open for ideas",
    joinedCount: 0,
    joinedNames: [],
    kind: "message",
    cta: "MESSAGE",
  },
  {
    id: "h4",
    name: "Jonas",
    avatarColor: "bg-ocean-dark",
    activityIcon: "footprints",
    activityLabel: "Evening run",
    status: "Starts 18:30",
    joinedCount: 1,
    joinedNames: ["Nina"],
    kind: "join",
    cta: "JOIN",
  },
  {
    id: "h5",
    name: "Nina",
    avatarColor: "bg-rust-dark",
    activityIcon: "movie",
    activityLabel: "Movie night",
    status: "Starts 21:00",
    joinedCount: 4,
    joinedNames: ["Lisa", "Mark", "Sophie", "Theo"],
    kind: "join",
    cta: "JOIN",
  },
];

export interface MoodOption {
  id: string;
  label: string;
  icon: IconName;
  color: string;
}

export const moodOptions: MoodOption[] = [
  { id: "free", label: "I'm free", icon: "sun", color: "bg-reef" },
  { id: "drinks", label: "Drinks", icon: "drink", color: "bg-rust" },
  { id: "coffee", label: "Coffee", icon: "coffee", color: "bg-gold-dark" },
  { id: "dinner", label: "Dinner", icon: "pizza", color: "bg-coral-dark" },
  { id: "walk", label: "Walk", icon: "footprints", color: "bg-olive" },
  { id: "sport", label: "Sport", icon: "surfboard", color: "bg-ocean-dark" },
  { id: "games", label: "Games", icon: "dice", color: "bg-gold" },
  { id: "movie", label: "Movie", icon: "movie", color: "bg-ocean" },
  { id: "other", label: "Something else", icon: "starburst", color: "bg-rust-dark" },
];

export interface ActivityNotification {
  id: string;
  type: "joined" | "message" | "started";
  name: string;
  color: string;
  text: string;
  time: string;
}

export const activityNotifications: ActivityNotification[] = [
  {
    id: "a1",
    type: "joined",
    name: "Lisa",
    color: "bg-rust",
    text: "joined your Coffee huddle",
    time: "2m ago",
  },
  {
    id: "a2",
    type: "message",
    name: "Sophie",
    color: "bg-gold-dark",
    text: 'sent you a message: "down for anything tbh"',
    time: "12m ago",
  },
  {
    id: "a3",
    type: "started",
    name: "Mark",
    color: "bg-ocean",
    text: "started Drinks tonight",
    time: "25m ago",
  },
  {
    id: "a4",
    type: "joined",
    name: "Theo",
    color: "bg-olive",
    text: "and 2 others joined Movie night",
    time: "1h ago",
  },
  {
    id: "a5",
    type: "joined",
    name: "Nina",
    color: "bg-rust-dark",
    text: "joined your Evening run",
    time: "3h ago",
  },
];
