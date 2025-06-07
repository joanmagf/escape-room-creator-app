// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "!./node_modules/**/*",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // Blau
          hover: "#2563EB",
        },
        secondary: {
          DEFAULT: "#10B981", // Verd
          hover: "#059669",
        },
        accent: {
          DEFAULT: "#F59E0B", // Taronja
          hover: "#D97706",
        },
      },
    },
  },
  plugins: [],
};

export default config;
