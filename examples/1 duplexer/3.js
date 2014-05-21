var spawn = require('child_process').spawn;
var ps = spawn('grep', [ 'ee' ]);

var fs = require('fs');
var rs = fs.createReadStream('/usr/share/dict/words');

var duplexer = require('duplexer');
var s = duplexer(ps.stdin, ps.stdout);
rs.pipe(s).pipe(process.stdout);
