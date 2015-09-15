var React = require('react');

// Let's build a simple series of components with props.
var Component = React.createClass({
  // React allows static typing of props!
  propTypes: {
    aNumber: React.PropTypes.number.isRequired,
    anOptionalString: React.PropTypes.string
  },
  render: function() {
    return (
      <div>
        <h3>Props</h3>
        <p>The value of aNumber: {this.props.aNumber}</p>
        <p>The value of aString: {this.props.aString}</p>
        <SubComponent aNumber={this.props.aNumber} aString={this.props.aString} />
        <SubComponent {...this.props} />
      </div>
    );
  }
});

var SubComponent = React.createClass({
  propTypes: {
    aNumber: React.PropTypes.number.isRequired,
    anOptionalString: React.PropTypes.string
  },
  render: function() {
    return (
      <div>
        <p>SubComponent: The value of aNumber * 2: {this.props.aNumber * 2}</p>
        <p>SubComponent: The value of aString: {this.props.aString}</p>
      </div>
    );
  }
});

// var element = <Component />;
var element = <Component aNumber={2} aString='Foo' />;
React.render(element, document.getElementById('container'));
