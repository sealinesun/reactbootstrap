import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Collapse from '../src/Collapse';

describe('Collapse', function () {

  let Component, instance;

  beforeEach(function(){

    Component = React.createClass({
      render(){
        let { children, ...props } = this.props;

        return (
          <Collapse
            ref={r => this.collapse = r}
            getDimensionValue={()=> 15 }
            {...props}
            {...this.state}
          >
            <div>
              <div ref="panel">
                {children}
              </div>
            </div>
          </Collapse>
        );
      }
    });
  });

  it('Should default to collapsed', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <Component>Panel content</Component>
    );

    assert.ok(
      instance.collapse.props.in === false);
  });


  describe('collapsed', function(){

    it('Should have collapse class', function () {
      instance = ReactTestUtils.renderIntoDocument(
        <Component>Panel content</Component>
      );

      assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'collapse'));
    });
  });

  describe('from collapsed to expanded', function(){
    let scrollHeightStub;

    beforeEach(function(){
      instance = ReactTestUtils.renderIntoDocument(
        <Component>Panel content</Component>
      );

      // since scrollHeight is gonna be 0 detached from the DOM
      scrollHeightStub = sinon.stub(instance.collapse, '_getScrollDimensionValue');
      scrollHeightStub.returns('15px');
    });


    it('Should have collapsing class', function () {
      instance.setState({ in: true });

      let node = ReactDOM.findDOMNode(instance);

      assert.equal(node.className, 'collapsing');
    });

    it('Should set initial 0px height', function (done) {
      let node = ReactDOM.findDOMNode(instance);

      function onEnter(){
        assert.equal(node.style.height, '0px');
        done();
      }

      assert.equal(node.style.height, '');

      instance.setState({ in: true, onEnter });
    });

    it('Should set node to height', function () {
      let node = ReactDOM.findDOMNode(instance);

      assert.equal(node.styled, undefined);

      instance.setState({ in: true });
      assert.equal(node.style.height, '15px');
    });

    it('Should transition from collapsing to not collapsing', function (done) {
      let node = ReactDOM.findDOMNode(instance);

      function onEntered(){
        assert.equal(node.className, 'collapse in');
        done();
      }

      instance.setState({ in: true, onEntered });

      assert.equal(node.className, 'collapsing');
    });

    it('Should clear height after transition complete', function (done) {
      let node = ReactDOM.findDOMNode(instance);

      function onEntered(){
        assert.equal(node.style.height, '');
        done();
      }

      assert.equal(node.style.height, '');

      instance.setState({ in: true, onEntered });
      assert.equal(node.style.height, '15px');
    });
  });

  describe('from expanded to collapsed', function(){
    beforeEach(function(){
      instance = ReactTestUtils.renderIntoDocument(
        <Component in>Panel content</Component>
      );
    });

    it('Should have collapsing class', function () {
      instance.setState({ in: false });
      let node = ReactDOM.findDOMNode(instance);
      assert.equal(node.className, 'collapsing');
    });

    it('Should set initial height', function () {
      let node = ReactDOM.findDOMNode(instance);

      function onExit(){
        assert.equal(node.style.height, '15px');
      }

      assert.equal(node.style.height, '');
      instance.setState({ in: false, onExit });
    });

    it('Should set node to height', function () {
      let node = ReactDOM.findDOMNode(instance);
      assert.equal(node.style.height, '');

      instance.setState({ in: false });
      assert.equal(node.style.height, '0px');
    });

    it('Should transition from collapsing to not collapsing', function (done) {
      let node = ReactDOM.findDOMNode(instance);

      function onExited(){
        assert.equal(node.className, 'collapse');
        done();
      }

      instance.setState({ in: false, onExited });

      assert.equal(node.className, 'collapsing');
    });

    it('Should have 0px height after transition complete', function (done) {
      let node = ReactDOM.findDOMNode(instance);

      function onExited(){
        assert.ok(node.style.height === '0px');
        done();
      }

      assert.equal(node.style.height, '');

      instance.setState({ in: false, onExited });
    });
  });

  describe('expanded', function(){

    it('Should have collapse and in class', function () {
      instance = ReactTestUtils.renderIntoDocument(
        <Component in >Panel content</Component>
      );

      expect(ReactDOM.findDOMNode(instance.collapse).className)
        .to.match(/\bcollapse in\b/);
    });
  });

  describe('dimension', function(){
    beforeEach(function(){
      instance = ReactTestUtils.renderIntoDocument(
        <Component>Panel content</Component>
      );
    });

    it('Defaults to height', function(){
      assert.equal(instance.collapse._dimension(), 'height');
    });

    it('Uses getCollapsibleDimension if exists', function(){

      function dimension(){
        return 'whatevs';
      }

      instance.setState({ dimension });

      assert.equal(instance.collapse._dimension(), 'whatevs');
    });
  });

  describe('with a role', function() {
    beforeEach(function(){
      instance = ReactTestUtils.renderIntoDocument(
        <Component role="note">Panel content</Component>
      );
    });

    it('sets aria-expanded true when expanded', function() {
      let node = ReactDOM.findDOMNode(instance);
      instance.setState({ in: true});
      assert.equal(node.getAttribute('aria-expanded'), 'true');
    });

    it('sets aria-expanded false when collapsed', function() {
      let node = ReactDOM.findDOMNode(instance);
      instance.setState({ in: false});
      assert.equal(node.getAttribute('aria-expanded'), 'false');
    });
  });
});
