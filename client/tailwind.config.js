/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primarybg' : '#000000',
        'secondarybg':'#0C0A09',
        'textcolor' : '#FFFFFF',
        'buttoncolor':'#EA580C',
        'buttonhovercolor':'#292524'
      }     
    },
  },
  plugins: [],
};
