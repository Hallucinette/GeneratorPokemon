/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arceus-dark': '#0f1620',
        'arceus-darker': '#050810',
        'arceus-light': '#1a2332',
        'arceus-blue': '#3b5476',
        'arceus-blue-dark': '#2d4058',
        'arceus-blue-darker': '#304663',
        'arceus-gold': '#ffe066',
        'arceus-gold-dark': '#ffd633',
        'arceus-brown': '#7c5d3f',
        'arceus-brown-dark': '#5a4330',
        pokemon: {
          red: '#EE1515',
          blue: '#3B4CCA',
          yellow: '#FFDE00',
        }
      },
      fontFamily: {
        'sans': ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
