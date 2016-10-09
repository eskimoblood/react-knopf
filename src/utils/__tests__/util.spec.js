import React from 'react';
import * as util from '../util';

describe('util', () => {
  it('limit angle to 360 degree', () => {
    const angleSmaller0 = util.limitAngleTo360Degree(-200);
    const angleLarger360 = util.limitAngleTo360Degree(400);
    expect(angleSmaller0).toBe(160);
    expect(angleLarger360).toBe(40);
  });

  it('converts degree to percent', () => {
    const degSmallerThenRange = util.degreeToPercent(200, 100);
    const degLargerThenRange = util.degreeToPercent(360, 400);
    expect(degSmallerThenRange).toBe(0.5);
    expect(degLargerThenRange).toBe(0);
  });

  it('create transformation string', () => {
    const transformation = util.getTransformation({ angle: 10, center: 20, radius: 100 });
    expect(transformation).toEqual({transform: 'rotate(10 20 20) translate(20 -80) '});
  });
});



