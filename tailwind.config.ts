/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "@custom-variant dark"],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Your custom named colors for direct use with Tailwind classes
        "stone-brown": "#423839",
        "honey-gold": "#d9a919",
        "olive-green": "#8b8b33",
        "bright-yellow": "#f3b315",
        "amber-brown": "#8e5915",
        lavender: "#c09cba",
        error: "#db4342",
      },
    },
  },
};
