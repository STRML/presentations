var React = require('react');

// Build for browser with webpack
// > webpack [input] [output]
// > webpack 1.js 1-bundle.js
var Hello = React.createClass({
  render: function() {
    return React.createElement('div', {style: {color: 'red'}}, 'Hello!');
  }
});

var element = React.createElement(Hello);
React.render(element, document.getElementById('container'));
