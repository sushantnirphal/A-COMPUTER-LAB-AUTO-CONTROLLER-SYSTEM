/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple_pri: {
          500: "#636fe7",
          600: "#5963cf",
          700: "#4f58b8",
          800: "#454da1",
          900: "#3b428a",
        },
        cyan_pri: "#5e99ee",
        dark: {
          500: "#16151e",
          400: "#21202d",
          300: "#2c2a3c",
          200: "#37354b",
        },
      },
    },
  },
  plugins: [],
};
