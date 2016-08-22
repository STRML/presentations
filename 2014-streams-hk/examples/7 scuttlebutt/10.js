var Model = require('scuttlebutt/model');
var model = new Model;

var http = require('http');
var server = http.createServer(function (req, res) {
    if (req.url === '/_replicate') {
        req.pipe(model.createStream()).pipe(res);
        return;
    }
    
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

server.listen(Number(process.argv[2]));

var request = require('request');
process.argv.slice(3).map(Number).forEach(function (port) {
    var r = request.put('http://localhost:' + port + '/_replicate');
    r.pipe(model.createStream()).pipe(r);
});
