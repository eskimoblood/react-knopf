import React, { PropTypes } from 'react';
import { getPosition, presets, getTransformation, limitedProps } from './util'

function Pointer(props) {

  const propsWithTransformation = getTransformation(props);
  if (props.children) {
    return <g>{React.Children.map(props.children, c => {
      if (typeof c.type === 'string') {
        const propsWithPosition = getPosition(c);
        return React.cloneElement(c, Object.assign(propsWithPosition, propsWithTransformation));
      } else {
        return React.cloneElement(c, Object.assign(propsWithTransformation, props));
      }
    })}</g>
  } else {
    const { type } = props;
    const propsWithPosition = getPosition({ type, props });
    const prop = Object.assign(propsWithPosition, propsWithTransformation, limitedProps(props));
    return presets[type](prop);
  }
}

Pointer.propTypes = {
  type: PropTypes.string
};

Pointer.defaultProps = {
  type: 'circle'
};

export default Pointer;
