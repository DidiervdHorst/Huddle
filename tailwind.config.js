/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mint: {
          light: "#CFF7E3",
          DEFAULT: "#8FE8C4",
          dark: "#5FD3A6",
        },
        lavender: {
          light: "#E6DCFB",
          DEFAULT: "#C7B3F5",
          dark: "#A88AEE",
        },
        coral: {
          light: "#FFD3CC",
          DEFAULT: "#FF9B85",
          dark: "#FF7A5C",
        },
        peach: {
          light: "#FFE8D1",
          DEFAULT: "#FFC79B",
          dark: "#FFAE6E",
        },
        sky: {
          light: "#D6ECFC",
          DEFAULT: "#A8D8F0",
          dark: "#7EC2E8",
        },
        ink: "#2B2440",
        muted: "#786F94",
      },
      fontFamily: {
        display: ["'Baloo 2'", "system-ui", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "28px",
        xl3: "36px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(90, 60, 140, 0.12)",
        floaty: "0 16px 40px rgba(255, 122, 92, 0.25)",
        card: "0 10px 30px rgba(90, 60, 140, 0.10)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blobMove: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(20px, -15px) scale(1.08)" },
          "66%": { transform: "translate(-15px, 10px) scale(0.95)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
        popIn: {
          "0%": { transform: "scale(0.85)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        gradientShift: "gradientShift 18s ease infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        blobMove: "blobMove 14s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
        popIn: "popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
