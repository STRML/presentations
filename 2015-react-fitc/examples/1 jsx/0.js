var React = require('react');

var Component = React.createClass({
  render: function() {
    return (
      <div>
        <h3>JSX Looks Like HTML</h3>
        <p>
          It's not really HTML though, it's JS objects.
        </p>
        <SubComponent />
      </div>
    );
  }
});

var SubComponent = React.createClass({
  render: function() {
    return (
      <h4>The end</h4>
    );
  }
});

React.render(<Component />, document.getElementById('container'));
