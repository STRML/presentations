var dnode = require('dnode');
var net = require('net');

var d = dnode();
d.on('remote', onConnect);

var c = net.connect(5004);
c.pipe(d).pipe(c);

// OH GOD WHY
function onConnect(remote) {
  console.log("Type something, e.g. beep 10");
  process.stdin.on('data', function(data) {
    data = data.toString().split(' ');
    var word = data[0];
    var frequency = parseInt(data[1], 10);
    remote.transform(word, function (cb) {
      // console.log(cb.toString());
      cb(frequency, function (s) {
        console.log(word + ':' + frequency + ' => ' + s);
      });
    });
  });
}
