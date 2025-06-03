/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#30c9d6',
        secondary: '#01c4d5',
        accent: '#029aaa',
      },
    },
  },
  plugins: [],
}
