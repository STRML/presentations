var fs = require('fs');
var webpack = require('webpack');

module.exports = {
    // Gives us JSX source maps
    devtool: 'cheap-module-source-map',
    sourceMapFilename: "debugging_webpack/[file].map",
    // Shortcut - read all files from disk to determine what we want to build
    entry: fs.readdirSync(__dirname).reduce(function(memo, fileName) {
        if (/^\d\.js.?$/.test(fileName)) {
            memo[fileName.replace(/\.js.?/, '')] = [
                'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
                'webpack/hot/dev-server',
                './' + fileName
            ];
        }
        return memo;
    }, {}),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel?stage=0'],
                exclude: /node_modules/
            },
            {
                test: /\.sass$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    output: {
        filename: '[name]-bundle.js'
    }
};
