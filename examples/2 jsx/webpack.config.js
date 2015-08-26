module.exports = {
    entry: {
        '0': './0.js',
        '1': './1.js'
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
