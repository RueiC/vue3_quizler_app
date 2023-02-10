/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'quizler-purple': '#E55896',
        'quizler-blue-1': '#4A56FB',
        'quizler-blue-2': '#353A65',
        'quizler-blue-3': '#2F3955',
        'quizler-black-1': '#515772',
        'quizler-black-2': '#747994',
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'sans-serif'],
      },

      backgroundImage: {
        hero: "url('/src/assets/hero.png')",
        motivation: "url('/src/assets/motivation.png')",
      },
    },

    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1500px',
    },
  },
  plugins: [],
};
