var React = require('react');
var MainComponent = require('./0/MainComponent');

// Export React for devtools
if (process.browser) window.React = React;

React.render(<MainComponent />, document.body);
