const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        abyss: {
          50: '#e8f2fe',
          100: '#c5d9f5',
          200: '#9eb8e8',
          300: '#7a9ad4',
          400: '#5a7dbc',
          500: '#3d5f9e',
          600: '#2a457a',
          700: '#1a2f57',
          800: '#0f1d38',
          900: '#050e1a',
          950: '#030812',
        },
        ocean: {
          50: '#e0fcff',
          100: '#b8f2ff',
          200: '#7fdeff',
          300: '#3dc9f5',
          400: '#0bc5ea',
          500: '#0099b8',
          600: '#007285',
          700: '#00505e',
          800: '#00333d',
          900: '#001a20',
        },
        pearl: {
          50: '#ffffff',
          100: '#f8faff',
          200: '#f0f4ff',
          300: '#e0e8f5',
          400: '#c4d0e8',
          500: '#a8b8d4',
          600: '#8a9cbc',
          700: '#6c7ea0',
          800: '#506284',
          900: '#384868',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'drift': 'drift 20s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.9' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(30px, -20px)' },
          '50%': { transform: 'translate(-20px, 10px)' },
          '75%': { transform: 'translate(10px, -30px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
