var Model = require('scuttlebutt/model');
var am = new Model;
var bm = new Model;

var as = am.createStream();
var bs = bm.createStream();

as.pipe(bs).pipe(as);

bm.on('update', function (key, value, source) {
    console.log(key + ' => ' + value + ' from ' + source);
});

am.set('beep', 789);
