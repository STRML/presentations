var React = require('react');

// Export React for devtools
if (process.browser) window.React = React;

var Component = React.createClass({
  getInitialState: function() {
    return {
      clicked: 0
    };
  },
  onIncrement: function() {
    this.setState({clicked: ++this.state.clicked});
  },
  render: function() {
    return (
      <div>
        <h3>State Updates on Action</h3>
        <p>Clicked: {this.state.clicked}</p>
        <Button onIncrement={this.onIncrement} clicked={this.state.clicked} />
      </div>
    );
  }
});

var Button = React.createClass({
  propTypes: {
    onIncrement: React.PropTypes.func.isRequired,
    clicked: React.PropTypes.number.isRequired
  },
  render: function() {
    return (
      <button onClick={this.props.onIncrement}>I have been clicked {this.props.clicked} times.</button>
    );
  }
});

React.render(<Component />, document.getElementById('container'));
