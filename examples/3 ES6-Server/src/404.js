import {Component} from 'react';

class FourOhFour extends Component {
  render() {
    let {state} = this;
    return (
      <div>
        <h3>Sorry! Page not found.</h3>
        <img src={require('file!../img/hackerman.jpg')} />
      </div>
    );
  }
}

export default FourOhFour;
