const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  module: {
    rules: [{ test: /\.(js)$/, use: 'babel-loader' }],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main_bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
