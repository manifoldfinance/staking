/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{tsx,ts}',
    './pages/**/*.{tsx,ts}',
    './views/**/*.{tsx,ts}',
    './constants/*.ts',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0C0F21',
          400: '#181b2c',
          300: '#303342',
        },
        network: {
          rinkeby: '#f6c343',
        },
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
};
