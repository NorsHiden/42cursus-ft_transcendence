/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: '8% repeat(4, 1fr) 8%',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Rowdies', 'serif'],
      mono: ['ui-monospace', 'monospace'],
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.30rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
  },
  plugins: [require('tailwindcss-debug-screens')],
};
