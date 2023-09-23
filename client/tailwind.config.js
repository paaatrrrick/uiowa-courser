const formsPlugin = require('@tailwindcss/forms')
const headlessuiPlugin = require('@headlessui/tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
      "colors": {
        "iowaYellow-100": "#FFF7C3",
        "iowaYellow-200": "#FFF0A0",
        "iowaYellow-300": "#FFE976",
        "iowaYellow-400": "#FFDF4C",
        "iowaYellow-500": "#FFCD00",
        "iowaYellow": "#FFCD00",
        "iowaYellow-600": "#E5B200",
        "iowaYellow-700": "#B59400",
        "iowaYellow-800": "#8A7500",
        "iowaYellow-900": "#6A5E00"
      },
      fontFamily: {
        sans: 'var(--font-inter)',
        display: 'var(--font-lexend)',
      },
      maxWidth: {
        '2xl': '40rem',
      },
      height: {
        "100": '100%',
      },
      width: {
        "100": '100%',
      },
    },
  },
  plugins: [formsPlugin, headlessuiPlugin],
}
