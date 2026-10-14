/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#07090e',
        accent: '#00f2fe',
        secondary: '#7928ca',
        platinum: '#e5e7eb',
      },
      fontFamily: {
        futuristic: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
