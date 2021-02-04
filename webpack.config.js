var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './public/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
}