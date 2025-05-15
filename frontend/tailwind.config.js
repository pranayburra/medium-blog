/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        customGray:'rgb(243 245 247)'
      },
      fontFamily: {
      poppins: "var(--font-poppins)" // Now you can use className="font-poppins"
      },
    },
  },
  plugins: [],
}
