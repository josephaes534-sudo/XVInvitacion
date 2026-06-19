/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],

  theme: {
    extend: {

      colors: {

        ocean: {
          900: "#123B63",
          800: "#1B4E7A",
          700: "#2D6F9E",
          600: "#3E8FBD",
          500: "#57AEDD",
          400: "#7BC8EA",
          300: "#9DDCF2",
          200: "#BFEAF7",
          100: "#E2F7FB",
        },

        primary: {
          DEFAULT: "#298D94",
        },

        gold: {
          DEFAULT: "#F8D86A",
          500: "#D4AF37",
          400: "#E4C76B",
          300: "#F2D88D",
          200: "#F8E8B9",
        },
        goldLight: "#FFE89A",
        oceanBlue: "#0D3B66",

        hallie: {
          coral: "#D96B4A",
          sage: "#A8B8A0",
          aqua: "#C9DDE0",
          ivory: "#EFE4CF",
          gold: "#E7D59B",
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
