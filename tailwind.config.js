require('dotenv').config();

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/client/**/*.tsx'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      height: { 18: '4.5rem' },
      minHeight: {
        0: '0',
        16: '4rem',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
      padding: { 18: '4.5rem' },
    },
  },
  variants: {
    extend: {
      borderColor: ['disabled'],
      cursor: ['disabled'],
      textColor: ['disabled'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
