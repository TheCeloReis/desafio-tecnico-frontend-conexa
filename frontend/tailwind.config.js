/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          dark: "#1C307F",
          medium: "#2E50D4",
          light: "#4F81FF",
        },
        gray: {
          dark: "#575453",
          medium: "#999392",
          light: "#dad2d0",
        },
      },
    },
  },
  plugins: [],
};
