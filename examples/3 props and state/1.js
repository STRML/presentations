var React = require('react');

// Export React for devtools
if (process.browser) window.React = React;

var Component = React.createClass({
  getInitialState: function() {
    return {
      theTime: new Date()
    };
  },
  render: function() {
    return (
      <div>
        <h3>Props</h3>
        <p>The current time: {this.state.theTime.toLocaleString()}</p>
        <SubComponent time={this.state.theTime} />
      </div>
    );
  }
});

var SubComponent = React.createClass({
  propTypes: {
    time: React.PropTypes.instanceOf(Date).isRequired
  },
  render: function() {
    return (
      <div>
        <p>SubComponent: The current time: {this.props.time.toLocaleString()}</p>
      </div>
    );
  }
});

React.render(<Component />, document.getElementById('container'));
