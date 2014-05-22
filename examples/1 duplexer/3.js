var spawn = require('child_process').spawn;
var grepStream = spawn('grep', [ 'ee' ]);

var fs = require('fs');
var wordStream = fs.createReadStream('/usr/share/dict/words');

var duplexer = require('duplexer');
var duplexGrepStream = duplexer(grepStream.stdin, grepStream.stdout);
wordStream.pipe(duplexGrepStream).pipe(process.stdout);
