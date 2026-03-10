/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        arcade: {
          yellow: '#FFD60A',
          black: '#000000',
          dark: '#0a0a0a',
        },
      },
      fontFamily: {
        arcade: ["'Press Start 2P'", 'cursive'],
        mono: ['Courier New', 'monospace'],
      },
      boxShadow: {
        arcade: '4px 4px 0px rgba(0, 0, 0, 0.3)',
        'arcade-lg': '8px 8px 0px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        flicker: 'flicker 0.15s infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            textShadow: '0 0 10px rgba(255, 214, 10, 0.7), 0 0 20px rgba(255, 214, 10, 0.4)',
          },
          '20%, 24%, 55%': {
            textShadow: 'none',
          },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 214, 10, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 214, 10, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
