/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './config/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          300: '#7aaec8',
          400: '#5a8eae',
          500: '#3a6e8e',
          600: '#2a5a78',
          700: '#1a4a68',
          800: '#0e3854',
          900: '#082640',
        },
        royal: {
          300: '#6a9ec0',
          400: '#4a7ea8',
          500: '#2a5e88',
          600: '#1a4e78',
          700: '#0a3e68',
        },
        electric: {
          300: '#90d4f0',
          400: '#70c0e8',
          500: '#50a8d8',
          600: '#3090c8',
        },
        gold: {
          300: '#f0d868',
          400: '#e8c84a',
          500: '#d4b040',
          600: '#c0a030',
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
