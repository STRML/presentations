var React = require('react');
var data = require('json!./data.json');
// Export React for devtools
if (process.browser) window.React = React;

var Table = React.createClass({
  render: function() {
    var header = Object.keys(data[0]).map(function(key) {
      // 'key' property helps React keep track of elements when they change
      return React.createElement('th', {key: 'header' + key}, key);
    });
    var rows = data.map(function(row, key) {
      return React.createElement('tr', {key: 'row' + key}, Object.keys(row).map(function(subKey) {
        var cell = row[subKey];
        return React.createElement('td', {key: subKey}, cell);
      }));
    });
    return React.createElement('table', {style: {'font-weight': 'bold'}}, header, rows);
  }
});

var element = React.createElement(Table);
React.render(element, document.getElementById('container'));
