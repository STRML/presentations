import ReactDOMServer from 'react-dom/server';
import AppMain from '../src/AppMain';

export default function render(props) {
  return ReactDOMServer.renderToString(<AppMain {...props} />);
}
