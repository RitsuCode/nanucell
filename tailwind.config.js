/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'logo': "url('/src/assets/images/logo.png')",
        'docTru': "url('/src/assets/images/doctor tru.png')",
        
      },
    },
  },
  plugins: [],
}
