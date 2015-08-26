import {Component, PropTypes} from 'react';
import Button from './Button';
import List from './List';

class MainComponent extends Component {
  // Per-class initializer. Save memory by using `static`.
  static propTypes = {
    clicked: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired
  }
  render() {
    let {props} = this;
    return (
      <div className="mainView">
        <h3>Welcome to {props.conference}.</h3>
        <Button onIncrement={() => this.props.onIncrement()} clicked={props.clicked} />
        <List times={props.clicked} />
      </div>
    );
  }
}

export default MainComponent;

