import React, { PropTypes } from 'react';
import Knob from '../Knob';
import Pointer from '../parts/Pointer';
import Arc from '../parts/Arc';
import { knobProps } from '../utils/util';
function P1(props) {
  return (
    <Knob  {...knobProps(props)}>
      <Arc fill={props.background} angle={props.angleOffset + props.angleRange} />
      <Arc fill={props.color} />
      <Pointer style={{ fill: props.color }} type="rect" width={props.size / 15} height={props.size / 3}>
      </Pointer>
    </Knob>
  );
}

P1.propTypes = Object.assign({
  color: PropTypes.string,
  background: PropTypes.string,
}, Knob.propTypes);

P1.defaultProps = Object.assign(
  {},
  Knob.defaultProps,
  {
    color: '#000',
    background: '#fff',
    angleOffset: 220,
    angleRange: 280
  }
);

export default P1;
