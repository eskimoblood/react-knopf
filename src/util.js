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

