/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },

    extend: {
      fontFamily: {
        'poppins-medium': ['Poppins-Medium', 'sans-serif'],
        'poppins-regular': ['Poppins-Regular', 'sans-serif'],
        'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
        'poppins-bold': ['Poppins-Bold', 'sans-serif'],
      },
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }],
      },
      width: {
        '3xl': '50rem',
        300: '300%',
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
        'custom-purple': 'rgb(166, 75, 244)',
      },
      boxShadow: {
        'shadow-custom': '0 2.4rem 2.4rem rgba(0, 0, 0, 0.1)',
        'custom-login': '0 5px 30px 0 rgba(3, 216, 222, .2)',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to left, #00dbde, #fc00ff, #00dbde, #fc00ff)',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
};
