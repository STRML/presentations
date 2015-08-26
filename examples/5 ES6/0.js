import React from 'react';
import MainComponent from './0/MainComponent-ES7';

// Export React for devtools
if (process.browser) window.React = React;

React.render(<MainComponent conference="MKEJS" />, document.body);
