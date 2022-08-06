/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary' : '#7126B5',
        'secondary' : '#E2D4F0',
        'neutralGray' : '#8A8A8A'
      },
      boxShadow: {
        'main': '0px 0px 4px 0px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
