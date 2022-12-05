/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
 module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./public/**/*.html",
    "./styles/**/*.css",
    "./components/**/*.tsx",
    "./node_modules/flowbite-react/**/*.tsx",
   ],
           daisyui: {
      themes: [
        {
          mytheme: {
          "accent": "#342E48",
          },
        },
      ],
    },
  plugins: [require("flowbite/plugin"), require("daisyui")],
    theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        silvero: '#D9D6CF',
        silverhover: '#A6A6A6',
        gradiento: 'radial-gradient(rgb(243, 244, 246), rgb(209, 213, 219))',
        fresh: '#495970',
        blackish: '#0f172a', //insidebox
        grayish: '#1B2439', //outsideofbox
        slate: 'rgb(5,13,32)',
        modalbg: '#101A31',
        modalbtn: '#636C83',
        almostwhite: '#E4E5E8',
        grayrose: '#342E48',
        darkviol: '#231C3B'
      }
    }
}
