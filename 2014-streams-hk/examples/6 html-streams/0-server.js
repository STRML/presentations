var http = require('http');
var fs = require('fs');
// Static file serving, similar to express.static()
var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(function (req, res) {

  // If we hit the root, bootstrap index.html with our dynamic data
  // Dynamic data will be an object of the signature
  // {who: String, message: String}
  if (req.url === '/') {
  }
  // Otherwise stream out static resources
  else ecstatic(req, res);
});
server.listen(8000);
