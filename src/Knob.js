import React, {Component} from 'react';
import {positionToAngle, degreeToPercent, getStartPosition} from './util'
class Knob extends Component {

  constructor(props) {
    super(props);
    this.state = {angle: 0, value: props.value || 0};
  }

  start() {
    var pos = getStartPosition(this.c);
    var fn = this.listenMouseMove.bind(this, pos);
    document.body.addEventListener('mousemove', fn);
    document.body.addEventListener('mouseup', function() {
      document.body.removeEventListener('mousemove', fn);
    });
  }

  listenMouseMove(center, e) {
    var angle = positionToAngle(center, e) - this.props.angleOffset;

    var percent = degreeToPercent(this.props.angleRange, angle);

    var value = this.props.min + (this.props.max - this.props.min) * percent;
    this.props.onChange(value);
    this.setState({angle, value});
  }


  render() {
    return (<svg
      onMouseDown={this.start.bind(this)} ref={function(c) {
      this.c = c;
    }.bind(this)}
      width={this.props.size}
      height={this.props.size}
      style={this.props.style}>
      { React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
          center: this.props.size / 2,
          knobSize: this.props.size,
          angle: this.state.angle,
          value: this.state.value
        }))
      }
    </svg>)
  }
}


Knob.defaultProps = {
  size: 100,
  angleOffset: 0,
  angleRange: 360,
  min: 0,
  max: 100
};


export default Knob;