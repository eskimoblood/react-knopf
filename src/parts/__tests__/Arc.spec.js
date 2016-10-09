import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Arc from '../Arc';

describe('Arc', () => {
  describe('renders correctly', () => {

    it('for small angels', () => {
      const arc = shallow(
        <Arc
          angleOffset={0}
          outerRadius={100}
          innerRadius={90}
          knobSize={100}
          center={0}
          angle={90}
          fill="lime"
          filter="filter1"
        />);
      expect(shallowToJson(arc)).toMatchSnapshot();
    });

    it('for large angels', () => {
      const arc = shallow(
        <Arc
          angleOffset={0}
          outerRadius={100}
          innerRadius={90}
          knobSize={100}
          center={0}
          angle={260}
          fill="lime"
          filter="filter1"
        />);
      expect(shallowToJson(arc)).toMatchSnapshot();
    });
  });
});



