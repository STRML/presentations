// Spawning a simple grep process, which return a `Process` handle
var spawn = require('child_process').spawn;
var grepStream = spawn('grep', [ 'ee' ]);
