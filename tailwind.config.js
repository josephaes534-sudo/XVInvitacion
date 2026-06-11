/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          300: '#4a8fd4',
          400: '#2a5a9e',
          500: '#0d1b2a',
          600: '#0a1628',
          700: '#0f1b33',
          800: '#0a1220',
          900: '#060e1a',
        },
        royal: {
          300: '#4a6aae',
          400: '#2a4a8e',
          500: '#1a3a6b',
          600: '#0f2a50',
          700: '#0d2345',
        },
        electric: {
          300: '#80f0ff',
          400: '#40e0ff',
          500: '#00d4ff',
          600: '#00b4d8',
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
