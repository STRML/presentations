var through = require('through');
var hyperglue = require('hyperglue');
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/static/row.html');

module.exports = function () {
  return through(function (line) {
    var row;
    try { row = JSON.parse(line); }
    catch (err) { return this.emit('error', err); }

    // Hyperglue is a library that creates simply inserts 
    // data into a string at given selectors. Similar to a templating 
    // language, but uses regular HTML strings.
    this.queue(hyperglue(html.toString(), {
      '.who': row.who,
      '.message': row.message
    }).outerHTML);
  });
};
