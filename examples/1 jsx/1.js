var React = require('react');
var data = require('json!./data.json');

var Table = React.createClass({
  createHeader: function(key) {
    // 'key' property helps React keep track of elements when they change
    return <th key={key}>{key}</th>;
  },
  createRow: function(row, key) {
    var cells = Object.keys(row).map(this.createCell.bind(this, row));
    return <tr key={row + key}>{cells}</tr>;
  },
  createCell: function(row, key) {
    var cell = row[key];
    return <td key={key}>{cell}</td>;
  },
  render: function() {
    var header = Object.keys(data[0]).map(this.createHeader);
    var rows = data.map(this.createRow);
    return (
      <table style={{'font-weight': 'bold'}}>
        {header}
        {rows}
      </table>
    );
  }
});

React.render(<Table />, document.getElementById('container'));
