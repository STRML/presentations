var React = require('react');
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

module.exports = Button;
