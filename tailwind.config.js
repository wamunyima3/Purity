/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#FFA500",
          600: "#FF7F00", // Adjusted color for better contrast
          700: "#FF6347", // Example for consistent usage
        },
        gray: {
          100: "#F7F7F7",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#808080",
          700: "#555555",
          800: "#363636",
          900: "#222222",
        },
      },
    },
  },
  plugins: [],
};
