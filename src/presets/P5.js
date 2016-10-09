import React, { PropTypes } from 'react';
import Knob from '../Knob'
import Pointer from '../parts/Pointer'
import { toRad, arcTo, moveTo, pointOnCircle } from '../utils/arcUtils';
import { knobProps } from '../utils/util';

const stepSize = 50;
const colorStep = 255 / stepSize;

function colorStops(e, i) {
  return (
    <linearGradient
      id={`color-stop-${i}`} x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stopColor={`hsl(${Math.round(colorStep * i)},100%, 50%)`} />
      <stop offset="100%" stopColor={`hsl(${Math.round(colorStep * (i + 1))},100%, 50%)`} />
    </linearGradient>
  );
}

function pathStep(props, e, i) {
  const step = props.angleRange / stepSize;
  const center = props.size / 2;
  const startAngle = props.angleOffset - 90 + i * step;
  const endAngle = startAngle + step + (i === 49 ? 0 : .6);
  var radius = center - props.strokeWidth / 2;
  const start = pointOnCircle(center, radius, toRad(startAngle));
  const end = pointOnCircle(center, radius, toRad(endAngle));

  return (
    <g>
      <path
        d={`${moveTo(start)} ${arcTo(end, center, 0, 1)}`}
        stroke={`url(#color-stop-${i})`} strokeWidth={props.strokeWidth} />
      <linearGradient
        id={`color-stop-${i}`}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={`hsl(${Math.round(colorStep * i)},100%, 70%)`} />
        <stop offset="100%" stopColor={`hsl(${Math.round(colorStep * (i + 1))},100%, 70%)`} />
      </linearGradient>
    </g>
  )
}
function P5(props) {
  return (
    <Knob  {...knobProps(props)}>
      <g fill="none" strokeWidth={props.strokeWidth}>
        {(Array.from({ length: stepSize }, pathStep.bind(null, props)))}
      </g>
      <Pointer color={props.color} r={props.strokeWidth} fill={props.color} />
    </Knob>
  );
}

P5.propTypes = Object.assign({
  color: PropTypes.string,
  background: PropTypes.string,
  strokeWidth: PropTypes.number
}, Knob.propTypes);

P5.defaultProps = Object.assign(
  {},
  Knob.defaultProps,
  {
    color: '#000',
    angleOffset: 220,
    angleRange: 280,
    strokeWidth: 3
  }
);

export default P5;
