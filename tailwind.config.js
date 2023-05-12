/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xl: "19px",
        "3xl": "32px", // Customize the font size of the text-3xl class here
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
        "dark-blue": "#1D3144",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
