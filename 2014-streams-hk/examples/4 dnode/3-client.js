// Client-side (could be another node.js service, browser, etc)
var dnode = require('dnode');
var net = require('net');

var d = dnode();

var c = net.connect(5004);
// This is the signature of a duplex stream;
// This line means: read from the connection, pipe its output to dnode,
// and send dnode's output back out the connection. Easy!
c.pipe(d).pipe(c);
