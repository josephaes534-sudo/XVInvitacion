/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a1628',
        royal: '#0f2a50',
        marine: '#006680',
        electric: '#00d4ff',
        teal: '#00bcd4',
        deep: '#060e1a',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'caustic': 'caustic 18s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'ray-pulse': 'rayPulse 3s ease-in-out infinite',
        'marine-float': 'marineFloat 6s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.1', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        caustic: {
          '0%': { backgroundPosition: '0% 0%' },
          '33%': { backgroundPosition: '50% 30%' },
          '66%': { backgroundPosition: '30% 60%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        rayPulse: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.6' },
        },
        marineFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(0.5deg)' },
          '75%': { transform: 'translateY(3px) rotate(-0.5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
