const { join } = require('path')

// available since Nx v 12.5
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind')
module.exports = {
  mode: 'jit',
  purge: [join(__dirname, './components/**/*.{tsx,ts}', './pages/**/*.{tsx,ts}',  './views/**/*.{tsx,ts}',   './constants/*.ts',), ...createGlobPatternsForDependencies(__dirname)],
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
