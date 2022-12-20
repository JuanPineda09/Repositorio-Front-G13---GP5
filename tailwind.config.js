/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/index.html","./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        linio: {
          'primary':  '#cc009c',
          'secondary': '#fd5514'
        },
      }
    },
  },
  plugins: [],
}
