import React, { PropTypes }from 'react';
import { getPosition, presets, getTransformation, limitedProps, normalizeProps } from './util'

function getScaleTicks(props) {
  const step = props.angleRange / props.steps;
  const end = props.steps + (props.angleRange === 360 ? 0 : 1);
  const ticks = [];
  for (var i = 0; i < end; i++) {
    ticks.push(getTick(i, step, props))
  }
  return ticks;
}


function getTick(i, step, props) {
  const angle = props.angleOffset + i * step;
  const propsWithTransformation = getTransformation(Object.assign({}, props, { angle }));

  if (props.children) {
    return null
  } else {
    const { type = 'circle' } = (props);
    const normalizedProps = normalizeProps(props);
    const propsWithPosition = getPosition({ type, props: normalizedProps });
    const prop = Object.assign(normalizedProps, propsWithPosition, propsWithTransformation, limitedProps(props));
    return presets[type](prop);
  }
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
