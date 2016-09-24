import React from 'react';

export function positionToAngle({ x, y }, { pageX, pageY }) {
  var posX = x - pageX;
  var posY = y - pageY;
  var deg = Math.atan2(-posY, -posX) * 180 / Math.PI + 90;

  return normalizeDegree(deg);
}

export function limitAngleTo360Degree(angle) {
  if (angle < 0) {
    return angle + 360;
  } else {
    return angle % 360;
  }
}

export function degreeToPercent(range, deg) {
  if (deg <= range) {
    return Math.max(Math.min(1, deg / range), 0);
  } else {
    return +(deg - range < (360 - range) / 2);
  }
}

export function getStartPosition(container) {
  var { left, top, width, height } = container.getBoundingClientRect();
  return {
    x: Math.floor(left) + document.body.scrollLeft + width / 2,
    y: Math.floor(top) + document.body.scrollTop + height / 2
  };
}

function normalizeDegree(deg) {
  if (deg < 0) {
    return deg + 360;
  } else {
    return deg % 360;
  }
}

export const presets = {
  circle({ transform, width: r, cx, cy, style, filter, fill }) {
    return <circle {...{ r, style, transform, cx, cy, filter, fill }} />
  },

  rect({ x, y, width, height, transform, style, filter, fill }) {
    return <rect {...{ style, transform, width, height, x, y, filter, fill }} />
  },

  triangle({ width, height, transform, style, filter, fill }){
    return (
      <path {...{ style, transform, filter, fill }}
            d={`M0 0 L${width / 2} ${height} L-${width / 2} ${height} Z`}
      />
    );
  }
};

export function normalizeProps(props) {
  return {
    r: props.r || props.width || props.tickWidth,
    width: props.width || props.tickWidth,
    height: props.height || props.tickHeight
  }
}

export function getPosition({ type, props:{ r, ry, width } }) {
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
      return {}
    }
  }
}

export function getTransformation({ angle, center, radius }) {
  return {
    transform: `rotate(${angle} ${center} ${center}) translate(${center} ${center - (radius || center)}) `
  }
}

export function limitedProps({ center, knobSize, angle, value, ...rest }) {
  return rest;
}
