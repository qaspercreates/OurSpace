/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#60a5fa", // light blue
          DEFAULT: "#3b82f6", // primary blue
          dark: "#1e40af", // dark blue
        },
      },
    },
  },
  plugins: [],
};
