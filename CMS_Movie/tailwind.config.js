
const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports =withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out',
        'smooth-appear': 'smooth-appear 1s ease forwards',
        'pulse-custom': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'smooth-appear': {
          to: {
            left: '20px',
            opacity: '1',
          },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
      fontFamily: {
        'Yellowtail': ['YELLOWTAIL','cursive'],
        'JosefinSans': ['JOSEFINSANS','cursive'],
        'AlfaSlabOne': ['ALFASLABONE','regular'],
        'MonaSans':['MONA','regular'],
        'roboto': ['Roboto', 'sans-serif'],
        'block-pro': ['block-pro', 'Helvetica Neue', 'Verdana', 'Arial', 'sans-serif'],
      }
      
    },
  },
  plugins: [],
}) 

