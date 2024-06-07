/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },

    extend: {
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }],
      },
      width: {
        '3xl': '50rem',
      },
      height: {
        screen: '100dvh',
        box: 'calc(100vh - 15rem)',
      },
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        text: 'var(--color-text)',
        'text-dark': 'var(--color-text-dark)',
        'background-100': 'var(--color-background-100)',
        'background-500': 'var(--color-background-500)',
        'background-900': 'var(--color-background-900)',
        red: 'var(--color-red)',
        'red-dark': 'var(--color-red-dark)',
      },
      boxShadow: {
        'shadow-custom': '0 2.4rem 2.4rem rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
