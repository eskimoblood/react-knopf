import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Pointer from '../Pointer';

jest.mock('', () => '');

describe('Pointer', () => {

  describe('with children', () => {

    it('of type rect', () => {
      const pointer = shallow(
        <Pointer transform="someTransformation" angle={0} center={50} radius={100}>
          <rect width={10} height={10} />
        </Pointer>
      );
      expect(shallowToJson(pointer)).toMatchSnapshot();
    });
    it('of type ellipse', () => {
      const pointer = shallow(
        <Pointer transform="someTransformation" angle={0} center={50} radius={100}>
          <ellipse rx={10} ry={10} />
        </Pointer>
      );
      expect(shallowToJson(pointer)).toMatchSnapshot();
    });

    it('of type circle', () => {
      const pointer = shallow(
        <Pointer transform="someTransformation" angle={0} center={50} radius={100}>
          <circle r={10} />
        </Pointer>
      );
      expect(shallowToJson(pointer)).toMatchSnapshot();
    });

    it('for custom component', () => {
      const Test = ()=> <div />
      const pointer = shallow(
        <Pointer transform="someTransformation" angle={0} center={50} radius={100}>
          <Test />
        </Pointer>
      );
      expect(shallowToJson(pointer)).toMatchSnapshot();
    });

  });

  describe('without children', () => {

    it('use the type prop to render the pointer', () => {
      const pointer = shallow(
        <Pointer
          type="rect"
          width={10}
          height={10}
          transform="someTransformation"
        />
      );
      expect(shallowToJson(pointer)).toMatchSnapshot();
    });

    it('without type prop renders a circle by default', () => {
      const pointer = shallow(
        <Pointer
          width={10}
          transform="someTransformation"
        />
      );
      expect(shallowToJson(pointer)).toMatchSnapshot();
    });

  });

});



