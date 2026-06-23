/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#221f1d",
        mist: "#f5f5f4",
        cream: "#f5f0e8",
        panel: "#f8f7f4",
        sand: "#dedbd5",
        accent: "#e7e5e0",
        accentStrong: "#24211f",
        muted: "#77736d",
        faint: "#9a9690",
        navy: "#0c1424",
        navyLight: "#1a2438",
        gold: "#c9a86c",
      },
      boxShadow: {
        panel: "0 18px 50px rgba(34, 31, 29, 0.08)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "sans-serif",
        ],
        serif: ["Georgia", "\"Times New Roman\"", "serif"],
      },
    },
  },
  plugins: [],
};
