var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
console.dir(webpackConfig);
var compiler = webpack(webpackConfig);
var express = require('express');

var app = express();

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));


app.use(require("webpack-hot-middleware")(compiler));

app.get('/', function(req, res) {
  res.send(`
    <html>
      <head>
      <head>
      <body>
        <script src="/0-bundle.js"></script>
      </body>
    </html>
  `);
});

console.log('app listening on 3000');
app.listen(3000);
