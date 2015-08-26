var React = require('react');

var Component = React.createClass({
  render: function() {
    return (
      <div>
        <h3>JSX Looks Like HTML</h3>
        <p>
          It's not really HTML though, it's JS objects.
        </p>
        <p className="second">
          There are only minor attribute differences between JSX and HTML. <code>className</code> is
          the only one you really need to worry about.
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
