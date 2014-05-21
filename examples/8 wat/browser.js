var shoe = require('shoe');
var sockStream = shoe('/sock');

var Model = require('scuttlebutt/model');
var model = new Model();

sockStream.pipe(model.createStream()).pipe(sockStream);

var setPerspective = window.setPerspective;
window.setPerspective = function(x, y) {
  model.set('position', {x: x, y: y});
  setPerspective.apply(this, arguments);
};

model.on('update', function(data){
  var key = data[0], value = data[1];
  if (key === 'position') setPerspective(value.x, value.y);
});
