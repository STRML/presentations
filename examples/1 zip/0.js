var http = require('http');
var port = process.argv[2];

http.createServer(function(req, res){
  var len = 0;
  req.on('data', function(chunk){
    len += chunk.length;
  });
  req.on('end', function(){
    res.end("length: " + len + "\n");
  });
}).listen(port);

console.log("Server started on port", port);
