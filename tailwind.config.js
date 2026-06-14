/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './config/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        deep: {
          700: '#236166',
          800: '#1C4B4F',
          900: '#16383B',
        },
        primary: {
          100: '#C9F0F1',
          200: '#A2E0E2',
          300: '#7CCDD1',
          400: '#59B8BE',
          500: '#3FA3AA',
          600: '#298D94',
        },
        glow: {
          50: '#E8FCFC',
        },
        gold: {
          200: '#FAEDC5',
          300: '#F0DA93',
          400: '#E4C76B',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}
