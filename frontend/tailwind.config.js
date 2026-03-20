/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f172a",
        "dark-card": "#1e293b",
        glass: "rgba(255,255,255,0.08)",
        "glass-light": "rgba(255,255,255,0.12)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
