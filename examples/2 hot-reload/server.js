var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
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
      </head>
      <body>
        <script src="/0-bundle.js"></script>
      </body>
    </html>
  `);
});

var port = 8082;
console.log('app listening at http://localhost:' + port);
app.listen(port);
