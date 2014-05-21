var Model = require('scuttlebutt/model');
var model = new Model;

var http = require('http');
var server = http.createServer(function (req, res) {
    var key = req.url.split('=')[0];
    var value = req.url.split('=')[1];
    
});

server.listen(Number(process.argv[2]));
