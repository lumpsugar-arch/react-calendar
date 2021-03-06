const path = require('path'),
      webpack = require('webpack'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
          "@babel/plugin-proposal-class-properties"
        ]
      }
    }, {
      test: /\.css$/i,
      use: [
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        },
        MiniCssExtractPlugin.loader
      ]
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        },
        {
          loader: 'less-loader',
          options: { sourceMap: true }
        },
        {
          loader: 'style-resources-loader',
          options: {
            patterns: path.resolve(__dirname, 'src/less/variables.less'),
            injector: 'append'
          }
        }],
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].[hash].css`,
    }),
    new HtmlWebpackPlugin({
      title: 'Calendar',
      template: 'src/index.html'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin()
  ]
};
