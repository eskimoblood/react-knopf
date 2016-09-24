import React, { PropTypes } from 'react';
import Knob from '../Knob'
import Arc from '../Arc';

function P3(props) {
  const innerRadius = props.size / 2 - props.strokeWidth;
  return (
    <Knob
      size={props.size}
      onChange={props.onChange}
      angleOffset={props.angleOffset}
      angleRange={props.angleRange}
      snapDistance={props.snapDistance}
    >
      <filter id='inner-shadow'>

        <feOffset
          dx='0'
          dy='1'
        />
        <feGaussianBlur
          stdDeviation='1'
          result='offset-blur'
        />
        <feComposite
          operator='out'
          in='SourceGraphic'
          in2='offset-blur'
          result='inverse'
        />
        <feFlood
          floodColor='black'
          floodOpacity='1'
          result='color'
        />
        <feComposite
          operator='in'
          in='color'
          in2='inverse'
          result='shadow'
        />
        <feComposite
          operator='over'
          in='shadow'
          in2='SourceGraphic'
        />
      </filter>
      <Arc fill={props.background} angle={props.angleOffset + props.angleRange} innerRadius={innerRadius} />
      <Arc fill={props.color} filter="url(#inner-shadow)" innerRadius={innerRadius} />

    </Knob>
  );
}

P3.propTypes = Object.assign({
  color: PropTypes.string,
  background: PropTypes.string,
  strokeWidth: PropTypes.number
}, Knob.propTypes);

P3.defaultProps = Object.assign(
  {},
  Knob.defaultProps,
  {
    color: '#000',
    background: '#fff',
    angleOffset: 220,
    angleRange: 280,
    strokeWidth: 10
  }
);

export default P3;
