/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F1E6D2",
          dark: "#E8D9BC",
          darker: "#DDC79E",
        },
        ink: {
          DEFAULT: "#25201A",
          soft: "#6E6252",
          faint: "#9C8E76",
        },
        gold: {
          light: "#F0C868",
          DEFAULT: "#DFA82F",
          dark: "#B9841E",
        },
        teal: {
          light: "#5FAE9C",
          DEFAULT: "#2F7A6B",
          dark: "#1D5346",
        },
        navy: {
          light: "#4A6FA5",
          DEFAULT: "#2C4F8C",
          dark: "#1B3260",
        },
        coral: {
          light: "#E8987E",
          DEFAULT: "#D96F4C",
          dark: "#B24F30",
        },
      },
      fontFamily: {
        display: ["'Luckiest Guy'", "cursive"],
        sans: ["Karla", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "20px",
        xl3: "26px",
      },
      boxShadow: {
        pop: "0 4px 0 rgba(37, 32, 26, 0.85)",
        popSm: "0 3px 0 rgba(37, 32, 26, 0.85)",
        popPress: "0 1px 0 rgba(37, 32, 26, 0.85)",
        card: "0 2px 10px rgba(37, 32, 26, 0.10)",
        floaty: "0 12px 30px rgba(37, 32, 26, 0.3)",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.55 },
        },
        popIn: {
          "0%": { transform: "scale(0.85)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        swell: {
          "0%, 100%": { transform: "translateX(0px) translateY(0px)" },
          "50%": { transform: "translateX(10px) translateY(-4px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        floatSlow: "floatSlow 5s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite",
        popIn: "popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        swell: "swell 7s ease-in-out infinite",
        spinSlow: "spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};
