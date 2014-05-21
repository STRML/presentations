var http = require('http');
var fs = require('fs');
var hyperstream = require('hyperstream');
// Static file serving, similar to express.static()
var ecstatic = require('ecstatic')(__dirname + '/static');

// Simple way to grab last n lines from a file as a stream, 
// similar to `tail -f`
var sliceFile = require('slice-file');
var sf = sliceFile(__dirname + '/data.txt');

// Shared render lib
var render = require('./render');

var server = http.createServer(function (req, res) {

  // If we hit the root, bootstrap index.html with our dynamic data
  if (req.url === '/') {
    var hs = hyperstream({
      '#rows': sf.slice(-5).pipe(render())
    });
    hs.pipe(res);
    fs.createReadStream(__dirname + '/static/index.html').pipe(hs);
  }
  // Otherwise stream out static resources
  else ecstatic(req, res);
});
server.listen(8000);

// Stream updates to data.txt to the client.
var shoe = require('shoe');
var sock = shoe(function (stream) {
  // sf.follow will pipe every new line out of the stream.
  sf.follow(-1,0).pipe(stream);
});
sock.install(server, '/sock');
