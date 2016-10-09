import React, { PropTypes } from 'react';
import { toRad, arcTo, lineTo, moveTo, pointOnCircle } from '../utils/arcUtils';

function Arc(props) {
  const startAngle = props.angleOffset - 90;
  const outerRadius = props.outerRadius || props.center;
  const innerRadius = props.innerRadius || props.center - props.knobSize / 15;
  const startAngleDegree = toRad(startAngle);
  const endAngleDegree = toRad(props.angle - 90);


  const p1 = pointOnCircle(props.center, outerRadius, endAngleDegree);
  const p2 = pointOnCircle(props.center, outerRadius, startAngleDegree);
  const p3 = pointOnCircle(props.center, innerRadius, startAngleDegree);
  const p4 = pointOnCircle(props.center, innerRadius, endAngleDegree);
  const largeArcFlag = (props.angle - props.angleOffset) < 180 ? 0 : 1;

  const moveToP1 = moveTo(p1);
  const arcToP2 = arcTo(p2, outerRadius, largeArcFlag, 0);
  const lineToP3 = lineTo(p3);
  const arcToP4 = arcTo(p4, innerRadius, largeArcFlag, 1);
  const lineToP1 = lineTo(p1);

  var d = `${moveToP1} ${arcToP2} ${lineToP3} ${arcToP4} ${lineToP1}`;

  return <path d={d} fill={props.fill} filter={props.filter} />;
}

Arc.propTypes = {
  outerRadius: PropTypes.number,
  innerRadius: PropTypes.number,
  center: PropTypes.number,
  angle: PropTypes.number,
  angleOffset: PropTypes.number,
  knobSize: PropTypes.number
};

export default Arc;
