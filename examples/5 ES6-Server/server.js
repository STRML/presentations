var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
var express = require('express');
var MainComponent = require('./build/app-server-bundle');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var app = express();

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));


app.use(require("webpack-hot-middleware")(compiler));

app.get('/', function(req, res) {
  var appHTML = ReactDOMServer.renderToString(<MainComponent conference="Web Unleashed" />);
  res.send(`
    <html>
      <head>
      </head>
      <body>
        <div id="content">${appHTML}</div>
        <script src="/0-bundle.js"></script>
      </body>
    </html>
  `);
});

console.log('app listening on 3000');
app.listen(3000);
