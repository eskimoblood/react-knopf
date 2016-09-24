import React, { PropTypes } from 'react';
import Knob from '../Knob'
import Pointer from '../Pointer'
import Scale from '../Scale';

function P4(props) {
  const { tickWidth } = props;
  return (
    <Knob
      size={props.size}
      onChange={props.onChange}
      angleOffset={props.angleOffset}
      angleRange={props.angleRange}
      snapDistance={props.snapDistance}
    >
      <filter
        id="blur"
        width={tickWidth * 2}
        height={tickWidth * 2}
        x={-tickWidth / 2}
        y={-tickWidth / 2}
      >
        <feGaussianBlur in="SourceGraphic" stdDeviation={tickWidth / 2} />
      </filter>
      <Scale
        type="circle"
        steps={(props.max - props.min) / props.snapDistance}
        tickWidth={tickWidth}
        fill={props.background}
        radius={props.size / 2 - tickWidth}
      />
      <Pointer radius={props.size / 2 - tickWidth}>
        <circle r={tickWidth} filter="url(#blur)" fill={props.color} />
        <circle r={tickWidth} fill={props.color} />
      </Pointer>
      />
    </Knob>
  );
}

P4.propTypes = Object.assign({
  color: PropTypes.string,
  background: PropTypes.string,
  tickWidth: PropTypes.number
}, Knob.propTypes);

P4.defaultProps = Object.assign(
  {},
  Knob.defaultProps,
  {
    tickWidth: 3,
    color: '#000',
    background: '#fff',
    angleOffset: 220,
    angleRange: 280,
    snapDistance: 10
  }
);

export default P4;
