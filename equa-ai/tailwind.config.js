/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          background: "#FFFFFF",
          text: "#000000",
          border: "#d8d8d8",
          primary: "#def3fa",
          secondary: "#e1f7dd",
          accentB: "#efefef",
          accent: "#0f0f0f",
          muted: "#E5E7EB",
        },
        // 🌚 Dark mode
        dark: {
          background: "#111827",
          surface: "#1F2937",
          text: "#F9FAFB",
          primary: "#3B82F6", // blue-500
          secondary: "#94A3B8", // slate-400
          accent: "#34D399", // emerald-400
          muted: "#374151", // gray-700
        },
      },
    },
  },
  plugins: [],
};
