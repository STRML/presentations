import {Component, PropTypes} from 'react';

class Button extends Component {
  static propTypes = {
    onIncrement: PropTypes.func.isRequired,
    clicked: PropTypes.number.isRequired
  }
  render() {
    return (
      <button onClick={this.props.onIncrement}>I have been clicked {this.props.clicked} times.</button>
    );
  }
}

export default Button;
