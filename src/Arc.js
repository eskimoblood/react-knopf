import React from 'react';

function Arc(props) {
  const startAngle = (props.angleOffset || 0) - 90;
  const outerRadius = props.outerRadius || props.center;
  const innerRadius = props.innerRadius || props.center - props.width;
  const startAngleDegree = toRad(startAngle);
  const endAngleDegree = toRad(startAngle + props.angle);

  const p1 = pointOnCircle(props.center, outerRadius, endAngleDegree);
  const p2 = pointOnCircle(props.center, outerRadius, startAngleDegree);
  const p3 = pointOnCircle(props.center, innerRadius, startAngleDegree);
  const p4 = pointOnCircle(props.center, innerRadius, endAngleDegree);
  const largeArcFlag = ( props.angle < 180 ? 0 : 1);

  const moveToP1 = moveTo(p1);
  const arcToP2 = arcTo(p2, outerRadius, largeArcFlag, 0);
  const lineToP3 = lineTo(p3);
  const arcToP4 = arcTo(p4, innerRadius, largeArcFlag, 1);
  const lineToP1 = lineTo(p1);

  return <path d={`${moveToP1} ${arcToP2} ${lineToP3} ${arcToP4} ${lineToP1}`}/>;
}

function moveTo(p) {
  return `M${p.x},${p.y}`;
}

function arcTo(p, radius, largeArcFlag, sweepFlag) {
  return `A${radius},${radius} 0 ${largeArcFlag} ${sweepFlag} ${p.x},${p.y}`;
}

function lineTo(p) {
  return `L${p.x},${p.y}`
}

function toRad(angle) {
  return Math.PI * angle / 180;
}

function pointOnCircle(center, radius, angle) {
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  };
}

export default Arc;