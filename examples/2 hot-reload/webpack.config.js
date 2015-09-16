var fs = require('fs');
var webpack = require('webpack');

module.exports = {
    // Gives us JSX source maps
    devtool: 'source-map',
    // Shortcut - read all files from disk to determine what we want to build
    entry: {
        '0': './0.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: '',
                    plugins: [
                      'react-display-name',
                      'react-transform',
                      'react-require'
                    ],
                    extra: {
                      'react-transform': [
                        {
                          target: 'react-transform-webpack-hmr',
                          imports: ['react'],
                          locals: ['module']
                        },
                      ]
                    }
                }
            },
            {
                test: /\.sass$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    output: {
        path: __dirname + '/build',
        filename: '[name]-bundle.js',
        publicPath: '/'
    }
};
