var http = require('http');
var fs = require('fs');
// Static file serving, similar to express.static()
var ecstatic = require('ecstatic')(__dirname + '/browser');

// Scuttlebutt
var Model = require('scuttlebutt/model');
var model = new Model();

var server = http.createServer(function (req, res) {
  // Connecting other servers
  if (req.url === '/_replicate') {
    req.pipe(model.createStream()).pipe(res);
  }

  // If we hit the root, bootstrap index.html with our dynamic data
  else if (req.url === '/') {
    fs.createReadStream(__dirname + '/browser/index.html').pipe(res);
  }
  // Otherwise stream out static resources
  else ecstatic(req, res);
});

// Stream updates to data.txt to the client.
var shoe = require('shoe');
var sock = shoe(function (stream) {
  stream.pipe(model.createStream()).pipe(stream);
});
sock.install(server, '/sock');


// Multi-server boilerplate
var port = Number(process.argv[2]);
server.listen(port);
console.log("Listening on port", port);

var request = require('request');
process.argv.slice(3).map(Number).forEach(function (port) {
  console.log("Connecting to existing server on port", port);
  var r = request.put('http://localhost:' + port + '/_replicate');
  r.pipe(model.createStream()).pipe(r);
});
