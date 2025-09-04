/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class", // or "media"
  theme: {
    extend: {
      colors: {
        // 🌞 Light mode
        light: {
          background: "#F9FAFB",
          surface: "#FFFFFF",
          text: "#111827",
          primary: "#2563EB", // blue-600
          secondary: "#64748B", // slate-500
          accent: "#10B981", // emerald-500
          muted: "#E5E7EB", // gray-200
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
