const path = require('path'),
      webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.min.js',
        libraryTarget: 'umd',
        publicPath: '/'
    },

    devServer: {
        contentBase: path.resolve(__dirname),
        compress: true,
        port: 9000,
        host: 'localhost',
        writeToDisk: true,
        historyApiFallback: true
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
            loader: 'css-loader',
            options: {
                url: true
            }
        }, {
            test: /\.less$/,
            use: ['style-loader','css-loader','less-loader', {
                loader: 'style-resources-loader',
                options: {
                    patterns: [
                      path.resolve(__dirname, 'src/less/variables.less')
                    ]
                }
            }],
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }]
    }
};
