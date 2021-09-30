const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  mode: mode,
  entry: './src/js/main.js',

  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin()],

  devServer: {
    static: './dist',
    hot: true,
  },
};
