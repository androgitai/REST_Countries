const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  mode: mode,
  entry: './src/js/main.js',

  output: {
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        // type: 'asset',
        // type: 'asset/inline',
        // parser: {
        //   maxSize: 30 * 1024,
        // },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
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
