export type IconName =
  | "wave"
  | "sun"
  | "starburst"
  | "spark"
  | "surfboard"
  | "drink"
  | "coffee"
  | "pizza"
  | "footprints"
  | "dice"
  | "movie"
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

export default function Icon({ name, size = 22, strokeWidth = 1.8, className = "" }: IconProps) {
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
