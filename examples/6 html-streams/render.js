var through = require('through');
var hyperglue = require('hyperglue');
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/static/row.html');

module.exports = function () {
  return through(function (line) {
    var row;
    try { row = JSON.parse(line); }
    catch (err) { return this.emit('error', err); }

    this.queue(hyperglue(html.toString(), {
      '.who': row.who,
      '.message': row.message
    }).outerHTML);
  });
};
