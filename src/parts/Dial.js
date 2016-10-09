import React, { PropTypes } from 'react';
import Pointer from './Pointer';

const getTick = (angleStep, step, props) => (_, i) => (
  <Pointer
    angle={props.angleOffset + i * angleStep}
    {...props}
  >
    <text>{step * i}</text>
  </Pointer>
);

function getScaleTicks({ angle, ...props }) {
  const angleStep = props.angleRange / props.steps;
  const step = (props.max - props.min) / props.steps;
  const end = props.steps + (props.angleRange === 360 ? 0 : 1);
  return Array.from({ length: end }, getTick(angleStep, step, props));
}

function Dial(props) {
  return <g> {getScaleTicks(props)} </g>
}

Dial.propTypes = {
  center: PropTypes.number,
  angle: PropTypes.number,
  angleOffset: PropTypes.number,
  knobSize: PropTypes.number,
  tickWidth: PropTypes.number,
  tickHeight: PropTypes.number,
};

Dial.defaultProps = {
  steps: 10,
  angleOffset: 0,
  angleRange: 360,
  tickWidth: 1,
  tickHeight: 5,
};

export default Dial;
