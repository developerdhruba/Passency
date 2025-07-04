/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        pinkAccent: "#FF99C8",
        yellowBg: "#FCF6BD",
        mint: "#D0F4DE",
        skyBlue: "#A9DEF9",
        lilac: "#E4C1F9",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
