import React, { PropTypes }from 'react';

function Scale(props) {
  return <g> {getTicks(props)} </g>
}

function getTicks(props) {
  const step = props.angleRange / props.steps;
  const end = props.steps + (props.angleRange === 360 ? 0 : 1);
  const ticks = [];
  for (var i = 0; i < end; i++) {
    ticks.push(getTick(i, step, props))
  }
  return ticks;
}

function getTick(i, step, props,) {
  const angle = props.angleOffset + i * step -180;
  const { center } = props;
  return <rect
    key={i}
    width={props.tickWidth}
    height={props.tickHeight}
    x={center}
    y={props.knobSize - props.tickHeight}
    transform={`rotate(${angle} ${center} ${center})`}
  style={props.style}/>
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