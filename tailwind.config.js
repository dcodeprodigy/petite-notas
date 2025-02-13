/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        "primary-background": "#E2E6E9",
        "p-grey": "#F6F7F9",
        "btn-blue": "#8DA6FF",
        "tag-blue": "#E6E3FE",
        "btn-yellow": "#FFD083",
        "t-blue": "#ABBEFC",
        "t-grey": "#64512B"
      },
      fontFamily: {
        sans : ['Montserrat', 'serif']
      }
    },
  },
  plugins: [],
};
