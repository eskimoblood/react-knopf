import React from 'react';

function Scale(props) {
  return <g> {getTicks(props)} </g>
}

function getTicks(props) {
  const step = props.angleRange / props.steps;
  const end = props.steps + (props.angleRange === "360" ? 0 : 1);
  const ticks = [];
  for (var i = 0; i < end; i++) {
    ticks.push(getTick(i, step, props))
  }
  return ticks;
}

function getTick(i, step, props,) {
  const angle = +(props.angleRange || 0) + i * step;
  const {center} = props;
  return <rect
    width={props.tickWidth}
    height={props.tickHeight}
    x={center}
    y={props.knobSize-props.tickHeight}
    transform={`rotate(${angle} ${center} ${center})`}/>
}

export default Scale;