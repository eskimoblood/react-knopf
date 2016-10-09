import React, { PropTypes } from 'react';
import Pointer from './Pointer';

const getTick = (step, props) => (_, i) => (
  <Pointer
    angle={props.angleOffset + i * step}
    {...props}
  />
);

function getScaleTicks({ angle, ...props }) {
  const step = props.angleRange / props.steps;
  const end = props.steps + (props.angleRange === 360 ? 0 : 1);
  return Array.from({ length: end }, getTick(step, props));
}

function Scale(props) {
  return <g> {getScaleTicks(props)} </g>
}

Scale.propTypes = {
  center: PropTypes.number,
  angle: PropTypes.number,
  angleOffset: PropTypes.number,
  knobSize: PropTypes.number,
  tickWidth: PropTypes.number,
  tickHeight: PropTypes.number,
};

Scale.defaultProps = {
  steps: 10,
  angleOffset: 0,
  angleRange: 360,
  tickWidth: 1,
  tickHeight: 5,
};

export default Scale;
