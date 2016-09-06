import React, { Component, PropTypes } from 'react';
import { positionToAngle, degreeToPercent, getStartPosition, limitAngleTo360Degree } from './util'
class Knob extends Component {

  constructor(props) {
    super(props);
    this.state = { angle: 0, value: props.value || 0 };
  }

  start() {
    const pos = getStartPosition(this.c);
    const fn = this.listenMouseMove.bind(this, pos);
    document.body.addEventListener('mousemove', fn);
    document.body.addEventListener('mouseup', function () {
      document.body.removeEventListener('mousemove', fn);
    });
  }

  listenMouseMove(center, e) {
    const mouseAngle = positionToAngle(center, e);
    const angleDiff = limitAngleTo360Degree(mouseAngle - this.props.angleOffset);
    const percent = degreeToPercent(this.props.angleRange, angleDiff);
    const value = this.props.min + (this.props.max - this.props.min) * percent;

    this.props.onChange(value);
    this.setState({ angle: this.props.angleOffset + percent * this.props.angleRange, value, percent });
  }

  render() {
    return (
      <svg
        onMouseDown={this.start.bind(this)}
        ref={function (c) {
          this.c = c;
        }.bind(this)}
        width={this.props.size}
        height={this.props.size}
        style={this.props.style}>
        { React.Children.map(this.props.children,
          (child) => React.cloneElement(child, {
            center: this.props.size / 2,
            knobSize: this.props.size,
            angleOffset: this.props.angleOffset,
            angleRange: this.props.angleRange,
            angle: this.state.angle,
            value: this.state.value,
            percent: this.state.percent
          }))
        }
      </svg>
    )
  }
}

Knob.propTypes = {
  size: PropTypes.number,
  angleOffset: PropTypes.number,
  angleRange: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
};

Knob.defaultProps = {
  size: 100,
  angleOffset: 0,
  angleRange: 360,
  min: 0,
  max: 100
};


export default Knob;