/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF8F3",
          soft: "#F6F1E8",
          deep: "#EEE6D6",
        },
        ink: {
          DEFAULT: "#2B2733",
          soft: "#6B6577",
          faint: "#A79FB2",
          mist: "#EDE9F2",
        },
        sunset: {
          light: "#FFB199",
          DEFAULT: "#FF7E5F",
          dark: "#E85D45",
        },
        bloom: {
          light: "#FFA4CC",
          DEFAULT: "#FF6FA0",
          dark: "#E14F86",
        },
        lavender: {
          light: "#D6CBFF",
          DEFAULT: "#9B8CFF",
          dark: "#7A68E8",
        },
        sky: {
          light: "#A6E6FF",
          DEFAULT: "#54C7F2",
          dark: "#2FA3D6",
        },
        mint: {
          light: "#AFF3D6",
          DEFAULT: "#3DDC97",
          dark: "#20B47E",
        },
        sun: {
          light: "#FFE9AE",
          DEFAULT: "#FFC857",
          dark: "#F0A93B",
        },
      },
      fontFamily: {
        display: ["'Baloo 2'", "system-ui", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "22px",
        xl3: "30px",
        xl4: "38px",
      },
      boxShadow: {
        soft: "0 8px 24px -6px rgba(122, 104, 232, 0.18)",
        card: "0 10px 30px -10px rgba(43, 39, 51, 0.14)",
        floaty: "0 24px 60px -16px rgba(43, 39, 51, 0.28)",
        glow: "0 0 0 1px rgba(255,255,255,0.5), 0 12px 28px -8px rgba(255, 126, 95, 0.35)",
        pop: "0 6px 16px -4px rgba(43, 39, 51, 0.22)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(120deg, #FF7E5F 0%, #FF6FA0 32%, #9B8CFF 66%, #54C7F2 100%)",
        "gradient-warm": "linear-gradient(135deg, #FFB199 0%, #FF6FA0 100%)",
        "gradient-cool": "linear-gradient(135deg, #9B8CFF 0%, #54C7F2 100%)",
        "gradient-mint": "linear-gradient(135deg, #AFF3D6 0%, #3DDC97 100%)",
        "gradient-sun": "linear-gradient(135deg, #FFE9AE 0%, #FFC857 100%)",
        "gradient-berry": "linear-gradient(135deg, #FFA4CC 0%, #9B8CFF 100%)",
        "gradient-ocean": "linear-gradient(135deg, #A6E6FF 0%, #3DDC97 100%)",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-14px) translateX(6px)" },
        },
        blobFloat: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(14px, -18px) scale(1.06)" },
          "66%": { transform: "translate(-10px, 10px) scale(0.96)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.55 },
        },
        popIn: {
          "0%": { transform: "scale(0.85)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        floatSlow: "floatSlow 6s ease-in-out infinite",
        blobFloat: "blobFloat 14s ease-in-out infinite",
        blobFloatSlow: "blobFloat 20s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite",
        popIn: "popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        gradientShift: "gradientShift 8s ease infinite",
        bounceSoft: "bounceSoft 2.4s ease-in-out infinite",
        spinSlow: "spin 50s linear infinite",
      },
      backgroundSize: {
        200: "200% 200%",
      },
    },
  },
  plugins: [],
};
