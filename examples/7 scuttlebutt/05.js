var Model = require('scuttlebutt/model');
var model = new Model;

var http = require('http');
var server = http.createServer(function (req, res) {
    // ...
});

server.listen(Number(process.argv[2]));
