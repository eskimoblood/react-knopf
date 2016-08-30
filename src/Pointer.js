import React from 'react';


const presets = {
  circle({transform, width: r, cx, cy, style}) {
    return <circle {...{r, style, transform, cx, cy}}/>
  },

  rect({x, y, width, height, transform, style}) {
    return <rect {...{style, transform, width, height, x, y}}/>
  },

  triangle({width, height, transform, style}){
    return <path {...{style, transform}} d={`M0 0 L${width/2} ${height} L-${width/2} ${height} Z`}/>
  }
};


function getTransformation( {angle, center, radius}) {
  return {
    transform: `rotate(${angle} ${center} ${center}) translate(${center} ${center - (radius || center)}) `
  }
}

function getPosition({type, props:{r, ry, width}}) {
  switch (type) {
  case 'ellipse': {
    return {
      cx: 0,
      cy: ry
    };
  }
  case 'circle':
    return {
      cx: 0,
      cy: r
    };
  case 'rect': {
    return {
      x: -width / 2,
      y: 0
    };
  }
  default : {
    return {

    }
  }
  }
}

function limitedProps({center, knobSize, angle, value, ...rest}) {
  return rest;
}

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
    const {type = 'circle'} = props;
    const propsWithPosition = getPosition({type, props});
    const prop = Object.assign(propsWithPosition, propsWithTransformation, limitedProps(props));
    return presets[type](prop);
  }
}

export default Pointer;