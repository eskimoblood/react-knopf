import React, { PropTypes } from 'react';
import Knob from '../Knob';
import Pointer from '../parts/Pointer';
import { knobProps } from '../utils/util';
function P2(props) {
  const center = props.size / 2;
  const radius = center - props.strokeWidth / 2;
  return (
    <Knob  {...knobProps(props)}>
      <circle
        r={radius}
        cx={center}
        cy={center}
        fill="none"
        stroke={props.color}
        strokeWidth={props.strokeWidth}
      />
      <Pointer
        style={{ fill: props.color }}
        type="rect"
        width={props.strokeWidth}
        height={props.strokeWidth * 3}
        radius={(radius - props.strokeWidth ) * .9}
      />
    </Knob>
  );
}

P2.propTypes = Object.assign({
  color: PropTypes.string,
  background: PropTypes.string,
  strokeWidth: PropTypes.number
}, Knob.propTypes);

P2.defaultProps = Object.assign(
  {},
  Knob.defaultProps,
  {
    color: '#000',
    background: '#fff',
    angleOffset: 0,
    angleRange: 360,
    strokeWidth: 3
  }
);

export default  P2;
