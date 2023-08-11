import type { Config } from "tailwindcss";

export default {
  content: [""],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Metropolis", "sans-serif"],
      },
      colors: {
        "light-blue": "#38ACE2",
        "dark-blue": "#0F1A24",
        "light-black": "#2E2E2E",
        "light-yellow": "#FFCF79",
        error: "#F42010",
        "light-white": "rgba(255, 255, 255, 0.16)",
      },
    },
  },
  plugins: [],
} satisfies Config;
