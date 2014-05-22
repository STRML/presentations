var spawn = require('child_process').spawn;
var grepStream = spawn('grep', [ 'ee' ]);

var fs = require('fs');
var wordStream = fs.createReadStream('/usr/share/dict/words');

wordStream.pipe(grepStream.stdin);
grepStream.stdout.pipe(process.stdout);
