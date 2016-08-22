var spawn = require('child_process').spawn;
var grepObject = spawn('grep', [ 'ee' ]);

var fs = require('fs');
// Let
var wordStream = fs.createReadStream('/usr/share/dict/words');

wordStream.pipe(grepObject.stdin);
