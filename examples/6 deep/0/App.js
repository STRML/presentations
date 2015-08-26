import {Component, PropTypes} from 'react';
import Sidebar from './Sidebar';
import MainView from './MainView';
import Footer from './Footer';
import './app.sass';

class MainComponent extends Component {
  state = {clicked: 0}
  static propTypes = {
    conference: PropTypes.string.isRequired
  }
  onIncrement() {
    this.setState({clicked: ++this.state.clicked});
  }
  render() {
    return (
      <div className="app">
        <div className="content">
          <Sidebar {...this.props} {...this.state} />
          <MainView {...this.props} {...this.state} onIncrement={() => this.onIncrement()}/>
          <Sidebar {...this.props} {...this.state} className="right-sidebar" />
        </div>
        <Footer {...this.props} {...this.state} />
      </div>
    );
  }
}

export default MainComponent;
