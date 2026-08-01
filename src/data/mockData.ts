import type { IconName } from "../components/Icon";

export interface Friend {
  id: string;
  name: string;
  color: string;
}

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
}

export interface HuddleCard {
  id: string;
  name: string;
  avatarColor: string;
  withNames: string[];
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
  avatarColor: "bg-navy",
  interests: ["Coffee walks", "Live music", "Board games", "Beach days", "Brunch"],
  favoriteActivities: [
    { icon: "coffee" as IconName, label: "Coffee" },
    { icon: "pizza" as IconName, label: "Dinner" },
    { icon: "dice" as IconName, label: "Games" },
    { icon: "footprints" as IconName, label: "Walk" },
  ],
};

export const friends: Friend[] = [
  { id: "f1", name: "Lisa", color: "bg-coral" },
  { id: "f2", name: "Mark", color: "bg-teal" },
  { id: "f3", name: "Sophie", color: "bg-gold-dark" },
  { id: "f4", name: "Theo", color: "bg-navy-light" },
  { id: "f5", name: "Amara", color: "bg-coral-dark" },
  { id: "f6", name: "Jonas", color: "bg-navy" },
  { id: "f7", name: "Nina", color: "bg-teal-dark" },
];

export const groups: Group[] = [
  { id: "g1", name: "Beach Crew", memberIds: ["f1", "f2", "f6"] },
  { id: "g2", name: "Uni Friends", memberIds: ["f3", "f4", "f7"] },
  { id: "g3", name: "Neighbors", memberIds: ["f5", "f2"] },
];

export const huddleFeed: HuddleCard[] = [
  {
    id: "h1",
    name: "Lisa",
    avatarColor: "bg-coral",
    withNames: [],
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
    avatarColor: "bg-teal",
    withNames: ["Theo"],
    activityIcon: "drink",
    activityLabel: "Drinks tonight",
    status: "Starts 20:00",
    joinedCount: 2,
    joinedNames: ["Lisa", "Jonas"],
    kind: "join",
    cta: "JOIN",
  },
  {
    id: "h3",
    name: "Sophie",
    avatarColor: "bg-gold-dark",
    withNames: [],
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
    avatarColor: "bg-navy",
    withNames: [],
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
    avatarColor: "bg-teal-dark",
    withNames: ["Lisa"],
    activityIcon: "movie",
    activityLabel: "Movie night",
    status: "Starts 21:00",
    joinedCount: 2,
    joinedNames: ["Mark", "Sophie"],
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
  { id: "free", label: "I'm free", icon: "sun", color: "bg-teal" },
  { id: "drinks", label: "Drinks", icon: "drink", color: "bg-coral" },
  { id: "coffee", label: "Coffee", icon: "coffee", color: "bg-gold-dark" },
  { id: "dinner", label: "Dinner", icon: "pizza", color: "bg-navy" },
  { id: "walk", label: "Walk", icon: "footprints", color: "bg-teal-dark" },
  { id: "sport", label: "Sport", icon: "surfboard", color: "bg-navy-dark" },
  { id: "games", label: "Games", icon: "dice", color: "bg-gold" },
  { id: "movie", label: "Movie", icon: "movie", color: "bg-coral-dark" },
  { id: "other", label: "Something else", icon: "starburst", color: "bg-navy-light" },
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
    color: "bg-coral",
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
    color: "bg-teal",
    text: "and Theo started Drinks tonight",
    time: "25m ago",
  },
  {
    id: "a4",
    type: "joined",
    name: "Theo",
    color: "bg-navy-light",
    text: "and 2 others joined Movie night",
    time: "1h ago",
  },
  {
    id: "a5",
    type: "joined",
    name: "Nina",
    color: "bg-teal-dark",
    text: "joined your Evening run",
    time: "3h ago",
  },
];
