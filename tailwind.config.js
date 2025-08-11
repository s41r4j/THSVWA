/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'hacksmith-dark': '#0b0b0f',
        'hacksmith-orange': '#ff7a00',
        'hacksmith-gray': '#1a1a1f',
        'hacksmith-light-gray': '#2a2a2f',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #ff7a00, 0 0 10px #ff7a00, 0 0 15px #ff7a00' },
          '100%': { boxShadow: '0 0 10px #ff7a00, 0 0 20px #ff7a00, 0 0 30px #ff7a00' },
        }
      }
    },
  },
  plugins: [],
};
