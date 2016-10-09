export function moveTo(p) {
  return `M${p.x},${p.y}`;
}

export function arcTo(p, radius, largeArcFlag, sweepFlag) {
  return `A${radius},${radius} 0 ${largeArcFlag} ${sweepFlag} ${p.x},${p.y}`;
}

export function lineTo(p) {
  return `L${p.x},${p.y}`
}

export function toRad(angle) {
  return Math.PI * angle / 180;
}

export function pointOnCircle(center, radius, angle) {
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  };
}
