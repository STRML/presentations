var Model = require('scuttlebutt/model');
var model = new Model;

var http = require('http');
var server = http.createServer(function (req, res) {
    var key = req.url.split('=')[0];
    var value = req.url.split('=')[1];
    
    if (value === undefined) {
        res.end(model.get(key) + '\n');
    }
    else {
        model.set(key, value);
        res.end(key + '=' + value + '\n');
    }
});

var port = Number(process.argv[2]);
server.listen(port);
console.log("Server listening on port", port);
