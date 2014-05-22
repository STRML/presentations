var http = require('http');
var fs = require('fs');
var zlib = require('zlib');
var port = process.argv[2];

http.createServer(function(req, res){
  // Pipe the request into a file and gzip it. We can see it
  // with gzcat
  var writeStream = fs.createWriteStream('./file.bin');
  var zlibStream = zlib.createGzip();
  req.pipe(zlibStream).pipe(writeStream);

  var len = 0;
  req.on('data', function(chunk){
    len += chunk.length;
  });
  req.on('end', function(){
    res.end("length: " + len + "\n");
  });
}).listen(port);

console.log("Server started on port", port);
