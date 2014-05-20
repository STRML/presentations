var d3 = window.d3;
var through = require('through');
var shoe = require('shoe');
var stream = shoe('/sock');

// Respond to data
stream.on('data', function(data) {
  data = JSON.parse(data);
  var x = d3.scale.linear()
      .domain([0, d3.max(data, function(d){ return Math.ceil(d.frequency / 10) * 10; })])
      .range([0, 800]);

  var bar = d3.select(".chart")
    .selectAll("div")
      .data(data);

  bar.transition()
    .style("width", function(d) { return x(d.frequency) + "px"; })
    .text(function(d) { return d.name + " (" + d.frequency + ")"; });

  bar.enter().append("div").transition()
      .style("width", function(d) { return x(d.frequency) + "px"; })
      .text(function(d) { return d.name + " (" + d.frequency + ")"; });
      
  bar.exit().remove();
});
