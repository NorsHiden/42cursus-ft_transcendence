/** @type {import('tailwindcss').Config} */

import debugScreensPlugin from 'tailwindcss-debug-screens';
import scrollbar from 'tailwind-scrollbar';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [{ pattern: /(text|bg)-(regular|cursed|vanish|goldRush)-(color|dark|lightDark)/ },
  { pattern: /(text|bg)-(black|lightBlack|darkGray|gray|white|primary|shade|green|blue|brown|purple|pink|red|DarkMaroon|BrightRed|redShade|lighgray)/ },
],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      scrollbar: ['dark'],
      gridTemplateColumns: {
        layout: '8% repeat(4, 1fr) 8%',
      },
      mixBlendMode: {
        'color-dodge': 'color-dodge',
      },
      gridTemplateRows: {
        layout: '120px minmax(0, 1fr)',
        section: 'auto minmax(0, 1fr)',
        chat: 'auto minmax(0, 1fr) max-content',
        channels: '25px 25px auto',
      },
      colors: {
        accent: '#FE5821',
        background:'#1B191D',
        'input-color': '#1E1F23',
        'input-border-color':'#3E4048',
        gray :'#71717A',
        lighgray:'#9B9CA2',
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
        darkGray: '#2C2D33',
        CharcoalGray: '#2B2D32',
        gray: '#5E6069',
        white: '#FFFFFF',
        primary: '#FE5821',
        shade: '#FF8C66',
        green: '#D5FF5C',
        blue: '#3DFFFB',
        brown: '#70311E',
        purple: '#6B26FF',
        pink: '#FF2695',
        red: '#FF2633',
        DarkMaroon:'#2B1F24',
        BrightRed:'#F32C44',
        redShade:'#E95E6F'

      },
      spacing: {
        '14': '3.5rem', 
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        'rowdies': ['Rowdies', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      aspectRatio: {
        '7/10': '70%',
      },
      fontSize: {
        xs: '0.5rem',
        sm: '0.8rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '1.30rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      'inter': ['Inter', 'sans-serif'],
      serif: ['Rowdies', 'serif'],
      mono: ['ui-monospace', 'monospace'],
    },
    fontSize: {
      xs: '0.50rem',
      sm: '0.75rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
  },
  plugins: [debugScreensPlugin, scrollbar],
};
