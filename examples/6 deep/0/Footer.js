import {Component, PropTypes} from 'react';
import Button from './Button';
import List from './List';

class Footer extends Component {
  static propTypes = {
    clicked: PropTypes.number.isRequired,
    conference: PropTypes.string.isRequired
  }
  render() {
    return (
      <div className="footer">
        Just in case you were wondering, you are at {this.props.conference} and you clicked {this.props.clicked} times.
      </div>
    );
  }
}

export default Footer;

