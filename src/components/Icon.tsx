export type IconName =
  | "wave"
  | "sun"
  | "starburst"
  | "star"
  | "spark"
  | "surfboard"
  | "drink"
  | "wine"
  | "coffee"
  | "pizza"
  | "footprints"
  | "shoes"
  | "dice"
  | "movie"
  | "camera"
  | "record"
  | "book"
  | "campfire"
  | "bicycle"
  | "tent"
  | "mountain"
  | "umbrella"
  | "boat"
  | "gift"
  | "cake"
  | "balloon"
  | "calendar"
  | "bell"
  | "heart"
  | "poll"
  | "chat"
  | "home"
  | "person"
  | "people"
  | "plus"
  | "pin"
  | "clock"
  | "check"
  | "close"
  | "chevron"
  | "palm"
  | "lightning";

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function Icon({ name, size = 22, strokeWidth = 2.2, className = "" }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (name) {
    case "wave":
      return (
        <svg {...common}>
          <path d="M2 15.5c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
          <path d="M2 19.5c2-2.3 4-2.3 6 0s4 2.3 6 0 4-2.3 6 0" opacity="0.5" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line key={deg} x1="12" y1="1.8" x2="12" y2="4.6" transform={`rotate(${deg} 12 12)`} />
          ))}
        </svg>
      );
    case "starburst":
      return (
        <svg {...common} strokeLinejoin="round">
          <path
            d="M12 2 14.4 9.3 22 9 15.9 13.7 18.1 21 12 16.6 5.9 21 8.1 13.7 2 9 9.6 9.3Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "star":
      return (
        <svg {...common} strokeLinejoin="round">
          <path d="M12 3 14.6 9.6 21.5 10 16 14.3 17.9 21 12 17.1 6.1 21 8 14.3 2.5 10 9.4 9.6Z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path
            d="M12 2c.5 5 1 5.5 6 6-5 .5-5.5 1-6 6-.5-5-1-5.5-6-6 5-.5 5.5-1 6-6Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "surfboard":
      return (
        <svg {...common}>
          <path d="M12 2.2c3 0 4.2 2.3 4.2 6.4v8.6c0 3-1.7 4.6-4.2 4.6s-4.2-1.6-4.2-4.6V8.6c0-4.1 1.2-6.4 4.2-6.4Z" />
          <line x1="12" y1="5" x2="12" y2="19.2" opacity="0.5" />
        </svg>
      );
    case "drink":
      return (
        <svg {...common}>
          <path d="M6 8h9v9.5A2.5 2.5 0 0 1 12.5 20h-4A2.5 2.5 0 0 1 6 17.5V8Z" />
          <path d="M15 10h1.8a2.2 2.2 0 0 1 0 4.4H15" />
          <path d="M6.3 8c.6-1 1.4-1 2-.2.6.8 1.4.8 2-.1.6-.9 1.5-.9 2 0" />
        </svg>
      );
    case "wine":
      return (
        <svg {...common}>
          <path d="M11 2.4h2v3.7c1.7.5 2.9 2.1 2.9 4.1v8c0 1.5-1.3 2.8-2.9 2.8h-2c-1.6 0-2.9-1.3-2.9-2.8v-8c0-2 1.2-3.6 2.9-4.1V2.4Z" />
          <line x1="8.4" y1="12.4" x2="15.6" y2="12.4" opacity="0.5" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...common}>
          <path d="M5 10h11.5v5.2a4.3 4.3 0 0 1-4.3 4.3H9.3A4.3 4.3 0 0 1 5 15.2V10Z" />
          <path d="M16.5 11.3h1.3a2.1 2.1 0 0 1 0 4.2h-1.3" />
          <path d="M9 7.2c-1-1-1-1.9-.1-3.2" />
          <path d="M13.2 7.2c-1-1-1-1.9-.1-3.2" />
        </svg>
      );
    case "pizza":
      return (
        <svg {...common} strokeLinejoin="round">
          <path d="M12 3.5 20.5 19a17 17 0 0 1-17 0Z" />
          <circle cx="10.3" cy="12.8" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="14.3" cy="14.6" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="12" cy="9.6" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );
    case "footprints":
      return (
        <svg {...common} strokeWidth={strokeWidth * 0.9}>
          <ellipse cx="8.8" cy="16.2" rx="2.3" ry="3.7" transform="rotate(-12 8.8 16.2)" fill="currentColor" stroke="none" />
          <circle cx="6.7" cy="10.6" r="0.95" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="10.3" cy="10.1" r="0.85" fill="currentColor" stroke="none" />
          <ellipse cx="15.6" cy="9.3" rx="2.1" ry="3.4" transform="rotate(13 15.6 9.3)" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="4.5" r="0.85" fill="currentColor" stroke="none" />
          <circle cx="15.9" cy="3.7" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="14.4" cy="4.3" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );
    case "shoes":
      return (
        <svg {...common}>
          <path d="M3 17.6c0-1 .5-1.7 1.4-2.1l3.8-1.7c.5-.2.9-.7 1-1.2l.3-1.5c.1-.6.7-1 1.3-.9l1.7.3c.4.1.7.3.9.7l1.5 2.6c.3.5.8.9 1.4 1l2.8.5c.8.1 1.4.8 1.4 1.6v1.2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
          <path d="M8.8 12.3c.9.8 2.2 1.3 3.6 1.3" opacity="0.5" />
        </svg>
      );
    case "dice":
      return (
        <svg {...common}>
          <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
          <circle cx="8.7" cy="8.7" r="1" fill="currentColor" stroke="none" />
          <circle cx="15.3" cy="8.7" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="8.7" cy="15.3" r="1" fill="currentColor" stroke="none" />
          <circle cx="15.3" cy="15.3" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "movie":
      return (
        <svg {...common}>
          <rect x="3" y="9.5" width="18" height="10.5" rx="2" />
          <path d="M3 9.5 4.6 5h3.6L6.6 9.5" />
          <path d="M10.4 9.5 12 5h3.6l-1.6 4.5" />
          <path d="M17.8 9.5 19.4 5" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
          <path d="M8.2 7.5 9.5 5h5l1.3 2.5" />
          <circle cx="12" cy="13.5" r="3.4" />
          <circle cx="17.4" cy="10.3" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "record":
      return (
        <svg {...common}>
          <rect x="3" y="9" width="18" height="10" rx="2" />
          <circle cx="9" cy="14" r="3.3" />
          <circle cx="9" cy="14" r="0.8" fill="currentColor" stroke="none" />
          <path d="M14.6 9.2 18.6 6.6" />
          <circle cx="18.6" cy="6.6" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 5.4c2.4-1.4 5-1.5 7.4-.4a.5.5 0 0 1 .3.45V19a.4.4 0 0 1-.6.35c-2.3-1.15-4.7-1-7 .35a.4.4 0 0 1-.6-.35V5.9c0-.2.1-.4.5-.5Z" />
          <path d="M20 5.4c-2.4-1.4-5-1.5-7.4-.4a.5.5 0 0 0-.3.45V19a.4.4 0 0 0 .6.35c2.3-1.15 4.7-1 7 .35a.4.4 0 0 0 .6-.35V5.9c0-.2-.1-.4-.5-.5Z" />
        </svg>
      );
    case "campfire":
      return (
        <svg {...common}>
          <path d="M5 19 11 15.5M19 19 13 15.5" />
          <path d="M12 20c-1.7 0-3-1.2-3-2.7 0-1.4 1-2.2 1.3-3.5.5 1 1.1 1.2 1.2.3.2 1 2.5 1.8 2.5 3.2 0 1.5-1.3 2.7-3 2.7Z" />
        </svg>
      );
    case "bicycle":
      return (
        <svg {...common}>
          <circle cx="6" cy="17" r="3.3" />
          <circle cx="18" cy="17" r="3.3" />
          <path d="M6 17 10 8h4l3.5 9M10 8l3.5 6.5H18" />
          <path d="M8.6 8h2.6" />
        </svg>
      );
    case "tent":
      return (
        <svg {...common}>
          <path d="M3 19 12 4l9 15Z" />
          <path d="M9.3 19 12 14l2.7 5" />
        </svg>
      );
    case "mountain":
      return (
        <svg {...common}>
          <path d="M2.5 19 9 8l3 5 2-3 7.5 9Z" />
          <circle cx="17.5" cy="6" r="1.8" />
        </svg>
      );
    case "umbrella":
      return (
        <svg {...common}>
          <path d="M3.5 11.5C3.5 6.8 7.3 3 12 3s8.5 3.8 8.5 8.5Z" />
          <path d="M12 11.5V19a1.7 1.7 0 0 1-3.3.4" />
          <path d="M12 3V1.6" />
        </svg>
      );
    case "boat":
      return (
        <svg {...common}>
          <path d="M3.5 15h17l-2.2 4.6H5.7Z" />
          <path d="M8 15V6.2h1.6L15 15" opacity="0.55" />
          <path d="M12 3.6v2.6" />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <rect x="4" y="10" width="16" height="10" rx="1.6" />
          <path d="M4 10h16M12 10v10" />
          <path d="M12 10c-.7-3-3-4.2-4.4-3.1C6.3 7.9 7.6 10 12 10Zm0 0c.7-3 3-4.2 4.4-3.1 1.3 1 0 3.1-4.4 3.1Z" />
        </svg>
      );
    case "cake":
      return (
        <svg {...common}>
          <path d="M4 20v-6.3A2.3 2.3 0 0 1 6.3 11.4h11.4A2.3 2.3 0 0 1 20 13.7V20Z" />
          <path d="M4 16.3h16" opacity="0.5" />
          <path d="M8 11.4V9M12 11.4V9M16 11.4V9" />
          <path d="M8 9c-.7-.7-.7-1.4 0-2.2M12 9c-.7-.7-.7-1.4 0-2.2M16 9c-.7-.7-.7-1.4 0-2.2" />
        </svg>
      );
    case "balloon":
      return (
        <svg {...common}>
          <path d="M12 3c3.3 0 5.7 2.6 5.7 5.9 0 3.6-2.6 6.5-4.8 7.4l.4 1.3h-2.6l.4-1.3C9 15.4 6.3 12.5 6.3 8.9 6.3 5.6 8.7 3 12 3Z" />
          <path d="M11.4 17.6 10.7 21" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="15" rx="2.4" />
          <path d="M3.5 10h17" />
          <path d="M8 3.5v3.4M16 3.5v3.4" />
          <circle cx="8.3" cy="14.2" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="14.2" r="1" fill="currentColor" stroke="none" />
          <circle cx="15.7" cy="14.2" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 16v-4.5a6 6 0 0 1 12 0V16l1.6 2.2H4.4Z" />
          <path d="M10.2 19.8a1.9 1.9 0 0 0 3.6 0" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20.2s-7.3-4.5-9.4-9.1C1.2 8 2.6 5 5.7 4.2a4.8 4.8 0 0 1 6.3 2.2A4.8 4.8 0 0 1 18.3 4.2c3.1.8 4.5 3.8 3.1 6.9C19.3 15.7 12 20.2 12 20.2Z" />
        </svg>
      );
    case "poll":
      return (
        <svg {...common}>
          <path d="M6 20V11M12 20V6M18 20v-7" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5.5h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8.5L7 20.5v-4H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M4 11.2 12 4.3l8 6.9" />
          <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8.2" r="3.4" />
          <path d="M5 20c0-4.1 3-6.6 7-6.6s7 2.5 7 6.6" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3" />
          <path d="M3.5 19.2c0-3.6 2.5-5.9 5.5-5.9s5.5 2.3 5.5 5.9" />
          <circle cx="16.3" cy="8" r="2.5" opacity="0.55" />
          <path d="M13.7 13.4c.6-.15 1.2-.25 1.9-.25 3 0 5.4 2.3 5.4 5.7" opacity="0.55" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5.2v13.6M5.2 12h13.6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 3c-3.9 0-6.8 2.9-6.8 6.7 0 4.8 6.8 11.1 6.8 11.1s6.8-6.3 6.8-11.1C18.8 5.9 15.9 3 12 3Z" />
          <circle cx="12" cy="9.9" r="2.1" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.3" />
          <path d="M12 7.6V12l3.3 2" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M4 12.7 8.7 17.4 20 6" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...common}>
          <path d="M6 9.5 12 15.2 18 9.5" />
        </svg>
      );
    case "palm":
      return (
        <svg {...common}>
          <path d="M12 21c.3-5.3.8-8.4 2-11.3" />
          <path d="M13.6 10.3c-2.8-3-6.6-3-8.6-1" />
          <path d="M13.6 10.3c-.9-3.7 1-6.8 3.8-7.9" />
          <path d="M13.6 10.3c1.8-3.7 5.5-3.9 7.6-1.9" />
          <path d="M13.6 10.3c2.6-.8 5.4.9 6.2 4" />
          <path d="M13.6 10.3c.8 2.8-1 5.5-3.6 6.5" />
        </svg>
      );
    case "lightning":
      return (
        <svg {...common} strokeLinejoin="round">
          <path d="M13 2 4.5 14h5.5l-1 8 9-13H12.5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
