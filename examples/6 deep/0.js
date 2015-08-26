import React from 'react';
import App from './0/App';

// Export React for devtools
if (process.browser) window.React = React;

React.render(<App conference="MKEJS" />, document.body);
