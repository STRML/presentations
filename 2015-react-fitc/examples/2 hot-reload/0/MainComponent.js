var React = require('react');
var Button = require('./Button');
require('./component.sass');

var MainComponent = React.createClass({
  propTypes: {
    aStr: React.PropTypes.string
  },
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

module.exports = MainComponent;
