import type { IconName } from "../components/Icon";

export type Gradient =
  | "bg-gradient-warm"
  | "bg-gradient-cool"
  | "bg-gradient-mint"
  | "bg-gradient-sun"
  | "bg-gradient-berry"
  | "bg-gradient-ocean";

export interface Friend {
  id: string;
  name: string;
  color: Gradient;
  birthday: { month: number; day: number };
  /** Time labels this friend already has something on — used to softly grey them
   * out when they'd likely be unavailable. Never explained in the UI. */
  busy: string[];
}

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
}

export const currentUser = {
  name: "Mayra",
  avatarColor: "bg-gradient-berry" as Gradient,
  birthday: { month: 5, day: 14 },
  interests: ["Coffee walks", "Live music", "Board games", "Beach days", "Brunch"],
  favoriteActivities: [
    { icon: "coffee" as IconName, label: "Coffee" },
    { icon: "pizza" as IconName, label: "Dinner" },
    { icon: "dice" as IconName, label: "Games" },
    { icon: "wave" as IconName, label: "Beach" },
  ],
};

export const friends: Friend[] = [
  { id: "f1", name: "Lisa", color: "bg-gradient-warm", birthday: { month: 12, day: 2 }, busy: ["Tonight"] },
  { id: "f2", name: "Mark", color: "bg-gradient-cool", birthday: { month: 3, day: 10 }, busy: ["This weekend"] },
  { id: "f3", name: "Sophie", color: "bg-gradient-sun", birthday: { month: 8, day: 9 }, busy: [] },
  { id: "f4", name: "Theo", color: "bg-gradient-ocean", birthday: { month: 9, day: 15 }, busy: ["Tonight"] },
  { id: "f5", name: "Amara", color: "bg-gradient-berry", birthday: { month: 6, day: 18 }, busy: [] },
  { id: "f6", name: "Jonas", color: "bg-gradient-mint", birthday: { month: 8, day: 21 }, busy: ["This weekend"] },
  { id: "f7", name: "Nina", color: "bg-gradient-warm", birthday: { month: 9, day: 3 }, busy: [] },
  { id: "f8", name: "Priya", color: "bg-gradient-cool", birthday: { month: 10, day: 30 }, busy: ["Tomorrow"] },
];

export const groups: Group[] = [
  { id: "g1", name: "Best Friends", memberIds: ["f1", "f2", "f7"] },
  { id: "g2", name: "Neighbours", memberIds: ["f5", "f6"] },
  { id: "g3", name: "Travel Friends", memberIds: ["f4", "f3", "f8"] },
  { id: "g4", name: "Volleyball", memberIds: ["f2", "f6", "f8"] },
];

export interface ActivityOption {
  id: string;
  label: string;
  icon: IconName;
  color: Gradient;
}

/** Starter ideas for an Activity Huddle. */
export const activityOptions: ActivityOption[] = [
  { id: "coffee", label: "Coffee Huddle", icon: "coffee", color: "bg-gradient-sun" },
  { id: "dinner", label: "Dinner Huddle", icon: "pizza", color: "bg-gradient-warm" },
  { id: "drinks", label: "Drinks Huddle", icon: "drink", color: "bg-gradient-berry" },
  { id: "wine", label: "Wine Huddle", icon: "wine", color: "bg-gradient-berry" },
  { id: "beach", label: "Beach Huddle", icon: "umbrella", color: "bg-gradient-ocean" },
  { id: "walk", label: "Walk Huddle", icon: "shoes", color: "bg-gradient-mint" },
  { id: "bike", label: "Bike Huddle", icon: "bicycle", color: "bg-gradient-mint" },
  { id: "movie", label: "Movie Huddle", icon: "movie", color: "bg-gradient-cool" },
  { id: "game", label: "Game Night Huddle", icon: "dice", color: "bg-gradient-cool" },
  { id: "book", label: "Book Huddle", icon: "book", color: "bg-gradient-warm" },
  { id: "music", label: "Music Night Huddle", icon: "record", color: "bg-gradient-berry" },
  { id: "campfire", label: "Campfire Huddle", icon: "campfire", color: "bg-gradient-sun" },
  { id: "hike", label: "Hike Huddle", icon: "mountain", color: "bg-gradient-mint" },
  { id: "camp", label: "Camping Huddle", icon: "tent", color: "bg-gradient-mint" },
  { id: "boat", label: "Boat Huddle", icon: "boat", color: "bg-gradient-ocean" },
  { id: "photo", label: "Photo Walk Huddle", icon: "camera", color: "bg-gradient-warm" },
  { id: "other", label: "Something Else", icon: "starburst", color: "bg-gradient-cool" },
];

export const timeOptions = ["Now", "Tonight", "Tomorrow", "This weekend", "Pick a date"];

export type ResponseStatus = "in" | "maybe" | "not";

export interface Comment {
  id: string;
  authorId: string;
  text: string;
  time: string;
}

export interface DatePollOption {
  id: string;
  label: string;
  votes: string[];
}

export interface Huddle {
  id: string;
  size: "small" | "big";
  kind: "activity" | "open";
  title: string;
  icon: IconName;
  hostId: string | "me";
  cohostIds: string[];
  timeLabel: string;
  location?: string;
  description?: string;
  invitedIds: string[];
  /** Friend responses. Only "in" and "maybe" are ever surfaced to the host — "not" is
   * stored only so the responding friend's own choice can be remembered, never shown. */
  responses: Record<string, ResponseStatus>;
  myResponse?: ResponseStatus;
  datePoll?: DatePollOption[];
  comments?: Comment[];
  countdownDate?: string;
}

export const huddles: Huddle[] = [
  {
    id: "h1",
    size: "small",
    kind: "activity",
    title: "Coffee Huddle",
    icon: "coffee",
    hostId: "f1",
    cohostIds: [],
    timeLabel: "Available now",
    location: "Nearby",
    invitedIds: ["f2", "f3", "f6", "f7"],
    responses: { f2: "in", f3: "in" },
  },
  {
    id: "h2",
    size: "small",
    kind: "activity",
    title: "Drinks Huddle",
    icon: "drink",
    hostId: "f2",
    cohostIds: ["f4"],
    timeLabel: "Tonight · 8:00 PM",
    location: "Bar Bloem",
    invitedIds: ["f1", "f6", "f7"],
    responses: { f1: "in", f6: "in" },
  },
  {
    id: "h3",
    size: "small",
    kind: "open",
    title: "I'm free this afternoon",
    icon: "sun",
    hostId: "f3",
    cohostIds: [],
    timeLabel: "This afternoon",
    invitedIds: ["f1", "f2", "f7", "f8"],
    responses: {},
  },
  {
    id: "h4",
    size: "small",
    kind: "activity",
    title: "Walk Huddle",
    icon: "shoes",
    hostId: "f6",
    cohostIds: [],
    timeLabel: "Tonight · 6:30 PM",
    location: "Riverside path",
    invitedIds: ["f7", "f1"],
    responses: { f7: "in" },
  },
  {
    id: "h5",
    size: "small",
    kind: "activity",
    title: "Movie Huddle",
    icon: "movie",
    hostId: "f7",
    cohostIds: ["f1"],
    timeLabel: "Tonight · 9:00 PM",
    invitedIds: ["f2", "f3"],
    responses: { f2: "in", f3: "in" },
  },
  {
    id: "h6",
    size: "small",
    kind: "activity",
    title: "Beach Huddle",
    icon: "umbrella",
    hostId: "me",
    cohostIds: [],
    timeLabel: "Saturday · 1:00 PM",
    location: "Zandvoort",
    description: "Bringing the good speaker and way too much fruit.",
    invitedIds: ["f1", "f2", "f4", "f6"],
    responses: { f1: "in", f2: "maybe", f4: "not" },
  },
  {
    id: "h7",
    size: "big",
    kind: "activity",
    title: "Sophie's Birthday Huddle",
    icon: "cake",
    hostId: "me",
    cohostIds: ["f7"],
    timeLabel: "Sunday, August 9",
    location: "Sophie's place",
    description: "Let's surprise Sophie properly this year. Bring something small for the group gift.",
    invitedIds: ["f1", "f2", "f4", "f5", "f6", "f8"],
    responses: { f1: "in", f2: "in", f6: "in", f4: "maybe" },
    comments: [
      { id: "c1", authorId: "f1", text: "I've got balloons covered 🎈", time: "2h ago" },
      { id: "c2", authorId: "f6", text: "Should we do a group gift instead of separate ones?", time: "1h ago" },
    ],
    countdownDate: "2026-08-09",
  },
  {
    id: "h8",
    size: "big",
    kind: "activity",
    title: "Weekend Huddle · Cabin Trip",
    icon: "tent",
    hostId: "me",
    cohostIds: [],
    timeLabel: "Date poll open",
    location: "Veluwe cabin",
    description: "Two nights, one fire pit, zero plans. Vote for the weekend that works.",
    invitedIds: ["f1", "f2", "f4", "f6", "f7"],
    responses: { f1: "in", f2: "in", f7: "maybe" },
    datePoll: [
      { id: "d1", label: "Aug 22–23", votes: ["f1", "f2", "f6"] },
      { id: "d2", label: "Aug 29–30", votes: ["f7"] },
    ],
    comments: [{ id: "c3", authorId: "f2", text: "22nd works way better for me", time: "5h ago" }],
    countdownDate: "2026-08-22",
  },
  {
    id: "h9",
    size: "big",
    kind: "activity",
    title: "Housewarming Huddle",
    icon: "gift",
    hostId: "f5",
    cohostIds: [],
    timeLabel: "Friday, August 28",
    location: "Amara's new place",
    description: "Finally got the keys! Come see it before the boxes take over again.",
    invitedIds: ["f1", "f2", "f3", "f6", "f7", "f8"],
    responses: { f1: "in", f3: "in", f8: "in" },
    comments: [{ id: "c4", authorId: "f8", text: "Sending you our address for the plant delivery 🌿", time: "1d ago" }],
    countdownDate: "2026-08-28",
  },
];

export interface Inspiration {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
  activityId: string;
}

export const inspirations: Inspiration[] = [
  { id: "i1", icon: "sun", title: "Perfect day for a picnic.", subtitle: "Sunny all afternoon", activityId: "other" },
  { id: "i2", icon: "umbrella", title: "Beach after work?", subtitle: "26° and clear skies", activityId: "beach" },
  { id: "i3", icon: "balloon", title: "Amsterdam Pride starts today.", subtitle: "City-wide celebration", activityId: "other" },
  { id: "i4", icon: "coffee", title: "Coffee outside?", subtitle: "Golden hour in an hour", activityId: "coffee" },
];

export interface ActivityNotification {
  id: string;
  type: "joined" | "message" | "started";
  name: string;
  color: Gradient;
  text: string;
  time: string;
}

export const activityNotifications: ActivityNotification[] = [
  { id: "a1", type: "joined", name: "Lisa", color: "bg-gradient-warm", text: "joined your Beach Huddle", time: "2m ago" },
  { id: "a2", type: "message", name: "Sophie", color: "bg-gradient-sun", text: 'sent you a message: "down for anything tbh"', time: "12m ago" },
  { id: "a3", type: "started", name: "Mark", color: "bg-gradient-cool", text: "and Theo started a Drinks Huddle", time: "25m ago" },
  { id: "a4", type: "joined", name: "Theo", color: "bg-gradient-ocean", text: "and 2 others joined Movie Huddle", time: "1h ago" },
  { id: "a5", type: "joined", name: "Nina", color: "bg-gradient-warm", text: "joined your Walk Huddle", time: "3h ago" },
];

const referenceToday = new Date(2026, 7, 2); // Aug 2, 2026 — keeps the prototype's "today" stable

export function daysUntil(month: number, day: number, from: Date = referenceToday): number {
  const year = from.getFullYear();
  let target = new Date(year, month - 1, day);
  if (target < from) target = new Date(year + 1, month - 1, day);
  const diff = Math.ceil((target.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function daysUntilDate(iso: string, from: Date = referenceToday): number {
  const target = new Date(iso);
  const diff = Math.ceil((target.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function friendName(id: string): string {
  if (id === "me") return currentUser.name;
  return friends.find((f) => f.id === id)?.name ?? "Someone";
}

export function friendColor(id: string): Gradient {
  if (id === "me") return currentUser.avatarColor;
  return friends.find((f) => f.id === id)?.color ?? "bg-gradient-cool";
}

export function upcomingBirthdays() {
  return [...friends]
    .map((f) => ({ friend: f, days: daysUntil(f.birthday.month, f.birthday.day) }))
    .sort((a, b) => a.days - b.days);
}
