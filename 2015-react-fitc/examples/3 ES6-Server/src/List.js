import {Component, PropTypes} from 'react';
import _ from 'lodash';

class List extends Component {
  static propTypes = {
    times: PropTypes.number.isRequired
  }
  render() {
    let items = _.times(this.props.times, (idx) => <li key={idx}>{idx}</li>);
    return (
      <ul>{items}</ul>
    );
  }
}

export default List;
