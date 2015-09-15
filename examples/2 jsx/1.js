var React = require('react');
var data = require('json!./data.json');

var Table = React.createClass({
  render: function() {
    var header = Object.keys(data[0]).map(function(key) {
      // 'key' property helps React keep track of elements when they change
      return <th key={header}>{key}</th>;
    });
    var rows = data.map(function(row, key) {
      var cells = Object.keys(row).map(function(subKey) {
        var cell = row[subKey];
        return <td key={subKey}>{cell}</td>;
      });
      return <tr key={row + key}>{cells}</tr>;
    });
    return (
      <table style={{'font-weight': 'bold'}}>
        {header}
        {rows}
      </table>
    );
  }
});

React.render(<Table />, document.getElementById('container'));
