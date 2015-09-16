var _ = require('lodash');
var config = require('./webpack.config');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =  _.extend({}, config, {
  target: 'node',
  entry: {
    'app': './bootstrap/server-prerender.js'
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
                  "react-require"
                ]
              }
          },
          {
              test: /\.sass$/,
              // Use ExtractTextPlugin to put sass in a file
              loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
          }
      ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ],
  output: {
    filename: '[name]-server-bundle.js',
    path: './build',
    libraryTarget: 'commonjs2'
  },
  externals: {'react': 'react'},
  devtool: null
});
