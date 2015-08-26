var fs = require('fs');

module.exports = {
    // Shortcut - read all files from disk to determine what we want to build
    entry: fs.readdirSync(__dirname).reduce(function(memo, fileName) {
        if (/^\d\.js.?$/.test(fileName)) {
            memo[fileName.replace(/\.js.?/, '')] = './' + fileName;
        }
        return memo;
    }, {}),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: '[name]-bundle.js'
    }
};
