var through = require('through');

var tr = through(function write(data) {
  this.queue(data);
});

process.stdin.pipe(tr).pipe(process.stdout);
