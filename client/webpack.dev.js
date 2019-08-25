const merge = require('webpack-merge'),
      common = require('./webpack.common'),
      path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname),
    compress: true,
    port: 9000,
    host: 'localhost'
  }
});