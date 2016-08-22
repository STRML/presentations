var React = require('react');
var ReactDOMServer = require('react-dom/server');

var Hello = React.createClass({
  render: function() {
    return React.createElement('div', {style: {color: 'red'}}, 'Hello!');
  }
});

var element = React.createElement(Hello);
// Renders to a string *without* a DOM
var output = ReactDOMServer.renderToString(element);
console.log(output);
