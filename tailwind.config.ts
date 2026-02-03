import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cyan: {
          400: "#00ffff",
          500: "#00cccc",
          600: "#009999",
        },
        pink: {
          400: "#ff00ff",
          500: "#ff00cc",
          600: "#cc00aa",
        },
        yellow: {
          400: "#ffff00",
          500: "#ffcc00",
          600: "#ffaa00",
        },
        purple: {
          400: "#aa00ff",
          500: "#8800cc",
          600: "#6600aa",
        },
        green: {
          400: "#00ff00",
          500: "#00cc00",
          600: "#00aa00",
        },
        zinc: {
          50: "#fafafa",
          100: "#f4f4f5",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        pixel: ["var(--font-pixel)", "monospace"],
        latex: ["var(--font-latex)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
