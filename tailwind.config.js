/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F4ECDC",
          dark: "#EBDFC7",
          darker: "#DFCFA9",
        },
        ink: {
          DEFAULT: "#221D16",
          soft: "#6B5F4E",
          faint: "#948667",
        },
        ocean: {
          light: "#6FA6BC",
          DEFAULT: "#3E7C93",
          dark: "#1F4756",
        },
        rust: {
          light: "#DE8560",
          DEFAULT: "#C2542E",
          dark: "#8F3D20",
        },
        coral: {
          light: "#F0AFA4",
          DEFAULT: "#E0897E",
          dark: "#C96455",
        },
        gold: {
          light: "#EAC576",
          DEFAULT: "#D9A441",
          dark: "#B3822E",
        },
        olive: {
          light: "#96A374",
          DEFAULT: "#6E7B52",
          dark: "#535D3D",
        },
        reef: {
          light: "#84BBA0",
          DEFAULT: "#4C8C6E",
          dark: "#396B54",
        },
      },
      fontFamily: {
        display: ["Bevan", "Georgia", "serif"],
        sans: ["Karla", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "20px",
        xl3: "28px",
      },
      boxShadow: {
        sticker: "5px 5px 0 rgba(34, 29, 22, 0.92)",
        stickerSm: "3px 3px 0 rgba(34, 29, 22, 0.9)",
        stickerPress: "1.5px 1.5px 0 rgba(34, 29, 22, 0.92)",
        card: "0 2px 0 rgba(34, 29, 22, 0.06), 0 10px 24px rgba(34, 29, 22, 0.08)",
        floaty: "0 10px 28px rgba(34, 29, 22, 0.28)",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.55 },
        },
        popIn: {
          "0%": { transform: "scale(0.85)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(14px)" },
        },
      },
      animation: {
        floatSlow: "floatSlow 5s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite",
        popIn: "popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
