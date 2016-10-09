import React, { PropTypes } from 'react';
import { getPosition, presets, getTransformation, limitedProps, normalizeProps } from '../utils/util';

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
    const { type = 'circle' } = (props);
    const normalizedProps = normalizeProps(props);
    const propsWithPosition = getPosition({ type, props: normalizedProps });
    const prop = Object.assign(normalizedProps, propsWithPosition, propsWithTransformation, limitedProps(props));
    return presets[type](prop);
  }
}

Pointer.propTypes = {
  type: PropTypes.string
};

Pointer.defaultProps = {};

export default Pointer;
