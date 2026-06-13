/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './config/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          300: '#6a8aa2',
          400: '#4a6a82',
          500: '#304a62',
          600: '#253a52',
          700: '#1a2a42',
          800: '#101e30',
          900: '#0a1628',
        },
        royal: {
          300: '#5a7aa0',
          400: '#3a5a80',
          500: '#2a4a70',
          600: '#1a3a60',
          700: '#0a2a50',
        },
        electric: {
          300: '#8ad0f0',
          400: '#6ac0e8',
          500: '#4ab0e0',
          600: '#2a98d0',
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
