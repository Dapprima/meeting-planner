const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './calendar/calendar.js',
    'create-event': './create-event/create-event.js',
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
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
  ],
};
