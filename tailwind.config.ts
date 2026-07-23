import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./next-map-components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        guruva: {
          soil: "#24180f",
          vine: "#174b35",
          grape: "#6f263d",
          gold: "#d5a642",
          paper: "#fffaf0"
        }
      }
    }
  },
  plugins: []
};

export default config;
