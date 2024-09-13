/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#213242",
        "window-primary": "#202020",
        "window-secondary": "#323232",
        "text-secondary": "#515150",
        "windows-blue": "#0078d7",
      },
      animation: {
        "slide-up": "slide-up 1s ease-in-out",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
