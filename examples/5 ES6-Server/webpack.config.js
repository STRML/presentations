var fs = require('fs');
var webpack = require('webpack');

module.exports = {
    // Gives us JSX source maps
    devtool: 'source-map',
    // Shortcut - read all files from disk to determine what we want to build
    entry: fs.readdirSync(__dirname).reduce(function(memo, fileName) {
        if (/^\d\.js.?$/.test(fileName)) {
            memo[fileName.replace(/\.js.?/, '')] = [
                'webpack-hot-middleware/client?path=/__webpack_hmr&overlay=true&reload=true', // WebpackDevServer host and port
                './' + fileName
            ];
        }
        return memo;
    }, {}),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: '',
                    'plugins': [
                      'react-transform',
                      'react-require'
                    ],
                    'extra': {
                      'react-transform': [
                        {
                          'target': 'react-transform-webpack-hmr',
                          'imports': ['react'],
                          'locals': ['module']
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
