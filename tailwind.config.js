/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#FFA500',
          700: '#FF7F00',
        },
        gray: {
          500: '#808080',
          700: '#555555',
          800: '#363636',
          900: '#222222',
        },
      },
    },
  },
  plugins: [],
}

