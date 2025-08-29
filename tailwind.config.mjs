/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#60a5fa",
          DEFAULT: "#3b82f6",
          dark: "#1e40af"
        }
      },
      boxShadow: {
        glass: "0 10px 24px rgba(2,6,23,.06), inset 0 1px 0 rgba(255,255,255,.6)"
      },
      borderRadius: {
        card: "14px"
      }
    }
  },
  plugins: []
};
