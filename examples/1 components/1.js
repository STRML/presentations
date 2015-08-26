var React = require('react');
// Export React for devtools
// Note that you have to run it over http, or allow access to file urls in extension config
if (process.browser) window.React = React;

var Component = React.createClass({
  displayName: 'Component',
  render: function() {
    return (
      React.createElement('div', {},
        React.createElement('h3', {}, 'Components can be nested'),
        React.createElement(SubComponent)
      )
    );
  }
});

var SubComponent = React.createClass({
  displayName: 'SubComponent',
  render: function() {
    return React.createElement('p', {}, 'This is a sub-component.');
  }
});

React.render(React.createElement(Component), document.getElementById('container'));
