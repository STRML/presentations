var _ = require('lodash');
var config = require('./webpack.config');

module.exports =  _.extend({}, config, {
  target: 'node',
  entry: {
    'app': './src/MainComponent-ES7.js'
  },
  module: {
      loaders: [
          {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                "plugins": [
                  "react-require"
                ]
              }
          },
          {
              test: /\.sass$/,
              loader: 'null-loader'
          }
      ]
  },
  output: {
    filename: '[name]-server-bundle.js',
    path: './build',
    libraryTarget: 'commonjs2'
  },
  externals: {'react': 'react'},
  devtool: null
});
