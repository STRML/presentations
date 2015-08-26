import {Component, PropTypes} from 'react';
import Button from './Button';
import List from './List';
import './component.sass';

class MainComponent extends Component {
  // Per-instance property initializer. No `static` keyword.
  state = {
    clicked: 0
  }
  // Per-class initializer. Save memory by using `static`.
  static propTypes = {
    conference: PropTypes.string.isRequired
  }
  onIncrement() {
    this.setState({clicked: ++this.state.clicked});
  }
  render() {
    let {state} = this;
    return (
      <div>
        <h3>ES7 Syntax at {this.props.conference}</h3>
        <p>Clicked: {state.clicked}</p>
        {/* Notice binding on onIncrement! ES6 classes don't autobind. */}
        {/* You could also use this.onIncrement.bind(this) */}
        <Button onIncrement={() => this.onIncrement()} clicked={state.clicked} />
        <List times={state.clicked} />
      </div>
    );
  }
}

export default MainComponent;
