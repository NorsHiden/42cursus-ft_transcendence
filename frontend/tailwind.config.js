/** @type {import('tailwindcss').Config} */
import t from 'tailwindcss-debug-screens';

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /(text|bg)-(regular|cursed|vanish|goldRush)-(color|dark|lightDark)/,
    },
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: '8% repeat(4, 1fr) 8%',
      },
      colors: {
        regular: {
          color: '#C2784F',
          dark: '#24150D',
          lightDark: '#4E2D1B',
        },
        cursed: {
          color: '#3DFFFB',
          dark: '#041F1E',
          lightDark: '#073736',
        },
        vanish: {
          color: '#8655F4',
          dark: '#1D1333',
          lightDark: '#332158',
        },
        goldRush: {
          color: '#FFCF53',
          dark: '#241D0C',
          lightDark: '#413415',
        },
        black: '#1B191D',
        lightBlack: '#1E1F23',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Rowdies', 'serif'],
      mono: ['ui-monospace', 'monospace'],
    },
    fontSize: {
      xs: '0.5',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
  },
  plugins: [t],
};

export default config;
