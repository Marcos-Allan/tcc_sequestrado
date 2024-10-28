/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "my-primary": "#3B7A58",
        "my-secondary": "#733A8E",
        "my-terciary": "#36253F",
        "my-black": "#000000",
        "my-gray": "#E7E5EC",
        "my-white": "#FFFFFF",
        "my-red": "#FF0000",
        "my-pink": "#DAC4E3",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

