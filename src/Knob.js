import React, { Component, PropTypes } from 'react';
import { positionToAngle, degreeToPercent, getStartPosition, limitAngleTo360Degree } from './util'
class Knob extends Component {

  constructor(props) {
    super(props);
    this.state = { angle: 0, value: props.value || 0 };
    this.start = this.start.bind(this);
    this.addPropsToChild = this.addPropsToChild.bind(this);
    this.setContainer = (c)=> this.c = c;
  }

  start() {
    const pos = getStartPosition(this.c);
    const fn = this.listenMouseMove.bind(this, pos);
    document.body.addEventListener('mousemove', fn);
    document.body.addEventListener('mouseup', function () {
      document.body.removeEventListener('mousemove', fn);
    });
  }

  snap(percent) {
    if (!this.props.snapDistance) {
      return percent;
    }
    const snapPercent = this.props.snapDistance / (this.props.max - this.props.min);
    const m = percent % snapPercent;
    if (m < snapPercent / 2) {
      return percent - m
    } else {
      return percent + snapPercent - m;
    }
  }

  listenMouseMove(center, e) {
    const mouseAngle = positionToAngle(center, e);
    const angleDiff = limitAngleTo360Degree(mouseAngle - this.props.angleOffset);
    const percent = this.snap(degreeToPercent(this.props.angleRange, angleDiff));

    const value = this.props.min + (this.props.max - this.props.min) * percent;

    this.props.onChange(value);
    this.setState({ angle: this.props.angleOffset + percent * this.props.angleRange, value, percent });
  }

  addPropsToChild(child) {
    if (typeof child.type === 'function') {
      return React.cloneElement(child, {
        center: this.props.size / 2,
        knobSize: this.props.size,
        angleOffset: this.props.angleOffset,
        angleRange: this.props.angleRange,
        angle: child.props.angle || this.state.angle,
        value: this.state.value,
        percent: this.state.percent
      })
    } else {
      return child;
    }
  }

  render() {
    return (
      <svg
        onMouseDown={this.start}
        ref={this.setContainer}
        width={this.props.size}
        height={this.props.size}
        style={this.props.style}>
        { React.Children.map(this.props.children, this.addPropsToChild) }
      </svg>
    );
  }
}

Knob.propTypes = {
  size: PropTypes.number,
  angleOffset: PropTypes.number,
  angleRange: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  snapDistance: PropTypes.number
};

Knob.defaultProps = {
  size: 50,
  angleOffset: 0,
  angleRange: 360,
  min: 0,
  max: 100,
  onChange: (e)=>e
};


export default Knob;
