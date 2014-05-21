var spawn = require('child_process').spawn;
var ps = spawn('grep', [ 'ee' ]);

var fs = require('fs');
var rs = fs.createReadStream('/usr/share/dict/words');

rs.pipe(ps.stdin);
