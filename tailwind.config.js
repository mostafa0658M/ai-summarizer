/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        xs: "480px",
      },
      keyframes: {
        popup: {
          "0%": { transform: "scale(1)", opacity: 0 },
          "25%": { transform: "scale(1.5)", opacity: 1 },
          "50%": { transform: "scale(1)", opacity: 1 },
          "90%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        popup: "popup 2s ease-in-out",
      },
    },
  },
  plugins: [],
};
