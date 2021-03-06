module.exports = {
    entry: {
        '0': './0.js'
    },
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
