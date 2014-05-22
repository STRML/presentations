var dnode = require('dnode');
var net = require('net');

var server = net.createServer(function (c) {
  var d = dnode();
  c.pipe(d).pipe(c);
});

server.listen(5004);
