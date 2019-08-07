const path = require('path'),
      webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.min.js',
        libraryTarget: 'umd'
    },

    devServer: {
        contentBase: path.resolve(__dirname),
        compress: true,
        port: 9000,
        host: 'localhost',
        open: true,
        writeToDisk: true
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components|build)/,
            loader: 'babel-loader'
        }]
    },

     plugins: [
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // })
    ]
};
