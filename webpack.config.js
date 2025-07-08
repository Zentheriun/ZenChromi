const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // Punto de entrada de tu JavaScript
  output: {
    filename: 'js/bundle.js', // El archivo JS final se llamará bundle.js dentro de la carpeta js
    path: path.resolve(__dirname, 'dist'), // La salida de todo el build estará en la carpeta 'dist'
    clean: true, // Limpia la carpeta 'dist' antes de cada build
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Servir archivos estáticos desde 'public'
    },
    compress: true,
    port: 3000, // Puerto del servidor de desarrollo
    hot: true, // Habilitar Hot Module Replacement
    open: true, // Abrir el navegador automáticamente
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Regla para archivos JavaScript
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Usar Babel para transpilar JS
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/, // Regla para archivos Sass/SCSS
        use: [
          MiniCssExtractPlugin.loader, // Extraer CSS a archivos separados
          'css-loader', // Interpretar @import y url() como import/require()
          'sass-loader', // Compilar Sass a CSS
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Regla para imágenes
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]', // Mantener las imágenes en una carpeta 'images'
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Regla para fuentes
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]', // Mantener las fuentes en una carpeta 'fonts'
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Usar tu index.html como plantilla
      filename: 'index.html', // El archivo HTML de salida
      inject: 'body', // Inyectar scripts al final del body
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css', // El archivo CSS final se llamará style.css dentro de la carpeta css
    }),
  ],
};