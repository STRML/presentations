var through = require('through');

var tr = through(function write(data) {
  var str = data.toString().slice(0, -1); // Remove trailing \n
  this.queue('> ' + str + ':' + str.length + '\n');
});

process.stdin.pipe(tr).pipe(process.stdout);
