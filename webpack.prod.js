const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './calendar/calendar.js',
    'create-event': './create-event/create-event.js',
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: buildPath,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './calendar/calendar.html',
      inject: 'body',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'create-event.html',
      template: './create-event/create-event.html',
      inject: 'body',
      chunks: ['create-event'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
};
