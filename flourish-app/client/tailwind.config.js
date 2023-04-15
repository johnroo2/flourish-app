/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // Extend the default color palette with your custom colors
        'keylime': '#e6f8b2',
        'palelime': '#fcffe8',
        'coral': '#ef6f6c',
        'coralbright': "#fa9fac",
        'jet': '#333333',
        'jetred': "#7a4444",
        'jetbright': "#888888",
        'yg-crayola': '#adc77f',
        'russian': '#709176',
        'grapefruit': "#FF7073",
        'tangerine': "#FF9E7B",
        'clementine': "#FFB37C",
        'pale': "#f5f9f5", 
        'palebold' : "#eaefea",
      },
    },
  },
  plugins: [],
}