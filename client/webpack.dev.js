const merge = require('webpack-merge'),
      common = require('./webpack.common'),
      path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname),
    compress: true,
    port: 9000,
    host: 'localhost',
    historyApiFallback: true
  }
});