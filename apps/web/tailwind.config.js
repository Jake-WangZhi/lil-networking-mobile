/** @type {import('tailwindcss').Config} */

import baseConfig from "@foundrymakes/tailwind-config";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
  presets: [baseConfig],
};
