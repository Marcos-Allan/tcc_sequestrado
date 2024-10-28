/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "my-primary": "#008000",
        "my-secondary": "#800080",
        "my-black": "#000000",
        "my-white": "#E7E5EC",
        "my-gray": "#979797",
        "my-red": "#ff0000",
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

