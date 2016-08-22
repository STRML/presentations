// Browser runner
var through = require('through');

// Render can be required from the browser just as from the server
var render = require('./render');

// Connect to WS
var shoe = require('shoe');
var stream = shoe('/sock');

// When data comes through the pipe, pipe it through our renderer,
// then insert it into the DOM.
stream.pipe(render()).pipe(through(function (html) {
  document.querySelector('#rows').innerHTML += html;
}));
