var dnode = require('dnode');
var net = require('net');

// 1. Call transform with string and function
// 2. Function is called with another function as an argument
// 3. Calling that function executes it on the other side
// 4. Dance continues until the actual work is done on line 13
var server = net.createServer(function (c) {
  var d = dnode({
    transform : function (s, cb) {
      cb(function (n, fn) {
        var oo = new Array(n+1).join('o');
        fn(s.replace(/[aeiou]{2,}/, oo).toUpperCase());
      });
    }
  });
  c.pipe(d).pipe(c);
});

server.listen(5004);
