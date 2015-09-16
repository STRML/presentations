import './app.sass';
import {Component, PropTypes} from 'react';
import {Locations, Location, NotFound} from 'react-router-component';
import MainComponent_ES6 from './MainComponent-ES6';
import MainComponent_ES7 from './MainComponent-ES7';
import FourOhFour from './404';

class AppMain extends Component {
  static propTypes = {
    initialRoute: PropTypes.string
  }
  static defaultProps = {
    initialRoute: '/'
  }
  state = {
    route: this.props.initialRoute
  }
  render() {
    var routerPath = process.browser ? undefined : this.state.route;

    return (
      <div className="appContainer">
        <header>Page Header</header>
        <div className="content">
          <Locations path={routerPath}>
            <Location path="/" handler={MainComponent_ES6} {...this.props} />
            <Location path="/ES7" handler={MainComponent_ES7} {...this.props} />
            <NotFound handler={FourOhFour} />
          </Locations>
        </div>
        <footer>Page Footer</footer>
      </div>
    );
  }
}

export default AppMain;
