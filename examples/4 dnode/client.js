var dnode = require('dnode');
var net = require('net');

var d = dnode();
d.on('remote', onConnect);

var c = net.connect(5004);
// This is the signature of a duplex stream;
// This line means: read from the connection, pipe its output to dnode,
// and send dnode's output back out the connection. Easy!
c.pipe(d).pipe(c);

// When a connection is established, start listening on stdin.
// Send inputted strings to be transformed.
function onConnect(remote) {
  process.stdin.on('data', function(data) {
    remote.transform(data.toString(), function (s) {
      console.log(data.toString().slice(0, -1) + ' => ' + s);
    });
  });
}
