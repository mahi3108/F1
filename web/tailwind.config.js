/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1: {
          dark: '#0B0E14',
          card: '#121620',
          hover: '#1B202E',
          border: '#242B3D',
          red: '#E10600',
          yellow: '#FFC900',
          cyan: '#00D2BE',
          orange: '#FF8700',
          blue: '#0090FF',
          green: '#229971'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
