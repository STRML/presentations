// Renderer
var through = require('through');
var hyperglue = require('hyperglue');
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/static/row.html');

module.exports = function () {

  // Create a through stream that parses incoming lines and 
  // renders them as HTML
  return through(function (line) {

    // Catch JSON parsing errors
    var row;
    try { row = JSON.parse(line); }
    catch (err) { return this.emit('error', err); }

    // Hyperglue reads an HTML string, parses selectors,
    // and allows us to insert text.
    this.queue(hyperglue(html.toString(), {
      '.who': row.who,
      '.message': row.message
    }).outerHTML);

  });
};
