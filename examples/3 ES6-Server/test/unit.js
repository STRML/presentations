var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var List = require('../src/List.js');
var Button = require('../src/Button.js');
var expect = require('expect');

var render = (element) => {
  var renderer = TestUtils.createRenderer();
  renderer.render(element);
  return renderer.getRenderOutput();
};

/*eslint-env mocha*/
describe('List', () => {
  it('should have three children', () => {
    var component = render(<List times={3} />);

    var lis = component.props.children;

    expect(lis.length).toBe(3);
    expect(lis[lis.length - 1].props.children).toBe(2);
  });
});

describe('Button', () => {
  it('should trigger event', () => {
    var clicked = 1;
    function onIncrement(e) { clicked++; }

    var component = render(<Button onIncrement={onIncrement} clicked={clicked} />);
    // TestUtils also has "Simulate" functions if you have a DOM
    component.props.onClick();

    expect(clicked).toBe(2);
  });
});
