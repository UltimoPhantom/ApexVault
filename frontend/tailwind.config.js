// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust according to your project structure
  ],
  theme: {
    extend: {
      keyframes: {
        'rgb-breathing': {
          '0%, 100%': { color: 'red' },
          '33%': { color: 'green' },
          '66%': { color: 'blue' },
        },
      },
      animation: {
        'rgb-breathing': 'rgb-breathing 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
