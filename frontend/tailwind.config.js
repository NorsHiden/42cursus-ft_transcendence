/** @type {import('tailwindcss').Config} */
import t from 'tailwindcss-debug-screens';
import g from '@tailwindcss/aspect-ratio'
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /(text|bg)-(regular|cursed|vanish|goldRush|accent)-(color|dark|lightDark)/,
    },
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
      gridTemplateColumns: {
        layout: '8% repeat(4, 1fr) 8%',
      },
      mixBlendMode: {
        'color-dodge': 'color-dodge',
      },
      colors: {
        accent: '#FE5821',
        background:'#1B191D',
        'input-color': '#1E1F23',
        'input-border-color':'#3E4048',
        gray :'#71717A',
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
      spacing: {
        '14': '3.5rem', /* Replace with your desired color */
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
        xs: '0.5',
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
  variants: {
    extend: {
      mixBlendMode: ['responsive'],
    },},
  plugins: [t,g],
};

export default config;