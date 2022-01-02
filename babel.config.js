module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-typescript', 'next/babel'],
    plugins: ["macros", ["styled-components", { "ssr": true }]]
}