/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './config/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          300: '#5a9fd4',
          400: '#3a7abe',
          500: '#000050',
          600: '#000060',
          700: '#000070',
          800: '#000040',
          900: '#000030',
        },
        royal: {
          300: '#5a7abe',
          400: '#3a5a9e',
          500: '#1a4a8a',
          600: '#0a3a7a',
          700: '#082a6a',
        },
        electric: {
          300: '#80d8f0',
          400: '#60c8e8',
          500: '#5ab8e8',
          600: '#4a9ad0',
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
