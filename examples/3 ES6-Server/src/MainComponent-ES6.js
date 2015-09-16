import {Component, PropTypes} from 'react';
import Button from './Button';
import List from './List';
import './component.sass';

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {clicked: 0};
  }
  onIncrement() {
    this.setState({clicked: ++this.state.clicked});
  }
  render() {
    let {props, state} = this;
    return (
      <div>
        <h3>ES6 Syntax at {props.conference}</h3>
        <div><a href="/ES7">View in ES7</a></div>
        <div><a href="/hackerman">Another Route</a></div>
        <p>Clicked: {state.clicked}</p>
        {/* Notice binding on onIncrement! ES6 classes don't autobind. */}
        {/* You could also use this.onIncrement.bind(this) */}
        <Button onIncrement={() => this.onIncrement()} clicked={state.clicked} />
        <List times={state.clicked} />
      </div>
    );
  }
}

// Static members must be declared outside the class definition due to ES6 limitations.
MainComponent.propTypes = {
  conference: PropTypes.string.isRequired
};

export default MainComponent;
