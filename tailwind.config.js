/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "cloudy-day": "url('/src/assets/static/cloudy_day.jpg')",
        "cloudy-night": "url('/src/assets/static/cloudy_night_1.jpg')",
        "foggy-day": "url('/src/assets/static/foggy_day_1.jpg')",
        "foggy-night": "url('/src/assets/static/foggy_night.jpg')",
        "rainy-day": "url('/src/assets/static/rainy_day.jpg')",
        "rainy-night": "url('/src/assets/static/rainy_night.jpg')",
        "snowy-day": "url('/src/assets/static/snowny_day.jpg')",
        "snowy-night": "url('/src/assets/static/snowny_night.jpg')",
        "sunny-day": "url('/src/assets/static/sunny_day_3.jpg')",
        "sunny-night": "url('/src/assets/static/sunny_night.jpg')",
      },
      fontFamily: {
        notosans: ["Noto Sans JP", "sans-serif"],
      },
      colors: {
        tertiary: "#495c51",
        secondary: "#314037",
        primary: "#141c18",
      },
      boxShadow: {
        "3xl":
          "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
