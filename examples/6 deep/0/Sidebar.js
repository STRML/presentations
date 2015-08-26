import {Component, PropTypes} from 'react';
import List from './List';

class MainComponent extends Component {
  state = {
    clicked: 0
  }
  static defaultProps = {
    className: ''
  }
  static propTypes = {
    className: PropTypes.string,
    conference: PropTypes.string.isRequired
  }
  render() {
    let {props} = this;
    return (
      <div className={"sidebar " + props.className}>
        <List times={props.clicked} />
      </div>
    );
  }
}

export default MainComponent;

