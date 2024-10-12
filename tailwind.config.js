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
        "my-white": "#FFFFFF",
        "my-gray": "#979797",
        "my-red": "#ff0000",
        "my-pink": "#e288cc",
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

