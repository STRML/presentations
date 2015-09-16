var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
var express = require('express');
var renderApp = require('./build/app-server-bundle');
var React = require('react');
var htmlEscape = require('html-escape');
var _ = require('lodash');

var app = express();

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));


app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(__dirname + '/build'));

app.get('/:route', function(req, res) {
  var initialData = {
    conference: 'Web Unleashed'
  };

  var appHTML = renderApp(_.extend({initialRoute: req.params.route}, initialData));
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </head>
      <body>
        <div id="initialData" data-data="${htmlEscape(JSON.stringify(initialData))}"></div>
        <div id="content">${appHTML}</div>
        <script src="/app-bundle.js"></script>
      </body>
    </html>
  `);
});

var port = process.env.PORT || 3000;
console.log(`app listening at http://localhost:${port}`);
app.listen(port);
