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
        "light-grey": "#2C353E",
        "dark-grey": "#1B252F",
        error: "#FB5913",
      },
    },
  },
  plugins: [],
} satisfies Config;
