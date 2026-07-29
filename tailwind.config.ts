import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0F",
        surface: "#151519",
        surfaceMuted: "#1E1E24",
        border: "#2A2A31",
        primary: {
          DEFAULT: "#7C5CFF",
          hover: "#6947FF",
          foreground: "#FFFFFF",
        },
        foreground: "#F5F5F7",
        muted: "#9A9AA5",
        success: "#34D399",
        danger: "#F87171",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
