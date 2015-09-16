var fs = require('fs');
var webpack = require('webpack');

module.exports = {
    // Gives us JSX source maps
    devtool: 'source-map',
    entry: {
        'app': './bootstrap/browser.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    plugins: [
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
