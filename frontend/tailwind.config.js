/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
      colors: {
        vibrantOrange: '#FE5821',
        background:'#1B191D',
        'input-color': '#1E1F23',
        'input-border-color':'#3E4048',
        'input-text-color':'#71717A'
      },
      spacing: {
        '17': '4.25rem',
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Rowdies', 'serif'],
      mono: ['ui-monospace', 'monospace'],
      'inter': ['Inter', 'sans-serif'],
    },
    fontSize: {
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
  plugins: [require('tailwindcss-debug-screens')],
};
