/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './config/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          300: '#8ab8b4',
          400: '#6a9a98',
          500: '#3a5a58',
          600: '#2a4a48',
          700: '#1a3a38',
          800: '#1a2a28',
          900: '#0a1a18',
        },
        royal: {
          300: '#8ab8b4',
          400: '#6a9a98',
          500: '#4a7a78',
          600: '#3a6a68',
          700: '#2a5a58',
        },
        electric: {
          300: '#b0e8e4',
          400: '#9adcd8',
          500: '#8ad4d0',
          600: '#6ac0bc',
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
