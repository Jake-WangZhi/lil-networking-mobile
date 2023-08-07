import type { Config } from "tailwindcss";

export default {
  content: [""],
  theme: {
    extend: {
      fontSize: {
        xs: "11px",
        xl: "19px",
        "2xl": "23px",
        "3xl": "32px",
      },
      lineHeight: {
        72: "57.6px",
        48: "38.4px",
      },
      fontFamily: {
        sans: ["Metropolis", "sans-serif"],
      },
      colors: {
        "light-blue": "#38ACE2",
        "dark-blue": "#0F1A24",
        "light-black": "#2E2E2E",
        "light-yellow": "#FFCF79",
        error: "#F42010",
      },
    },
  },
  plugins: [],
} satisfies Config;
