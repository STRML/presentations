var Model = require('scuttlebutt/model');
var model = new Model;

var http = require('http');
var server = http.createServer(function (req, res) {
    // When a client hits replicate, their http stream is duplexed
    // into the model
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
