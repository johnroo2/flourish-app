/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ['Inter', 'Inter']
    },
    extend: {
      colors: {
        // Extend the default color palette with your custom colors
        'keylime': '#e6f8b2',
        'palelime': '#fefff0',
        'coral': '#ef6f6c',
        'coralbright': "#fa9fac",
        'coralultrabright': "#ffd0da",
        'jet': '#333333',
        'jetred': "#aa7460",
        'jetbright': "#888888",
        'yg-crayola': '#adc77f',
        'russian': '#66826D',
        'grapefruit': "#FF7073",
        'tangerine': "#FF9E7B",
        'clementine': "#FFB37C",
        'pale': "#f5f9f5", 
        'palebold' : "#cadaca",
      },
    },
  },
  plugins: [],
}