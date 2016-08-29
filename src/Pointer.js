import React from 'react';


const presets = {
  circle({transform, width: r, cx, cy, style}) {
    return <circle {...{r, style, transform, cx, cy}}/>
  },

  rect({x, y, width, height, transform, style}) {
    return <rect {...{style, transform, width, height, x: x - width / 2, y}}/>
  }
};


function getPositionProps(props) {
  const {angle, center, radius, height, width} = props;
  const posY = (radius != null ? center - radius : height != null ? height : width);
  return {
    x: center,
    y: posY,
    cx: center,
    cy: posY,
    transform: `rotate(${angle} ${center} ${center})`
  }
}

function limitedProps({center, knobSize, angle, value, ...rest}, {width}) {
  if (width) {
    rest.x -= width / 2;
  }
  return rest;

}

function Pointer(props) {
  const positionProps = getPositionProps(props);
  const extendedProps = Object.assign(positionProps, props);

  if (props.children) {
    return <g>{React.Children.map(props.children, c => {
      if (typeof c.type === 'string') {
        return React.cloneElement(c, limitedProps(extendedProps, c.props));
      } else {
        return React.cloneElement(c, extendedProps)
      }
    })}</g>
  } else {
    const {type = 'circle'} = props;
    return presets[type](extendedProps);
  }
}

export default Pointer;