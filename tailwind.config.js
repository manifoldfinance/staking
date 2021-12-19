module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{tsx,ts}',
    './pages/**/*.{tsx,ts}',
    './views/**/*.{tsx,ts}',
    './constants/*.ts',
  ],
  darkMode: 'media',
  theme: {
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
  variants: {
    extend: {},
  },
  plugins: [],
};
