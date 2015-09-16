import ReactDOM from 'react-dom';
import AppMain from '../src/AppMain';

// Get data
const dataEl = document.getElementById('initialData');
const initialData = JSON.parse(dataEl.getAttribute('data-data'));
dataEl.parentNode.removeChild(dataEl);

// Render app
ReactDOM.render(<AppMain {...initialData} />, document.querySelector("#content"));
