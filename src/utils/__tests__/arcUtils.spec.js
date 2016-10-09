import {
  moveTo,
  arcTo,
  lineTo,
  pointOnCircle
} from '../arcUtils';

describe('arcUtils', () => {
  describe('render path statements ', () => {

    it('for moveto', () => {
      expect(moveTo({ x: 1, y: 2 })).toBe('M1,2');
    });

    it('for arcTo', () => {
      expect(arcTo({ x: 5, y: 6 }, 10, 1, 0)).toBe('A10,10 0 1 0 5,6');
    });

    it('for lineTo', () => {
      expect(lineTo({ x: 1, y: 2 })).toBe('L1,2');
    });
  });

  it('calculates a point on a circle', () => {
    expect(pointOnCircle(10, 10, 0)).toEqual({ "x": 20, "y": 10 });
  });
});



