import baseConfig from "@foundrymakes/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      fontSize: {
        xs: 11,
        xl: 19,
        "2xl": 23,
        "3xl": 32,
      },
      lineHeight: {
        72: "57.6",
        48: "38.4",
      },
    },
  },
};
