module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage', // Importar polyfills solo cuando sea necesario
      corejs: 3, // Usar core-js versión 3
    }],
  ],
};