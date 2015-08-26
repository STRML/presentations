var React = require('react');

var Hello = React.createClass({
  render: function() {
    return React.createElement('div', {style: {color: 'red'}}, 'Hello!');
  }
});

var element = React.createElement(Hello);
// Renders to a string *without* a DOM
var output = React.renderToString(element);
console.log(output);
