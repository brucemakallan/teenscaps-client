import React from 'react';
import { mount } from 'enzyme';
import { Admin } from '.';

describe('Admin', () => {
  it('should render correctly', () => {
    const props = {
      loginAction: jest.fn(),
      history: {
        push: jest.fn(),
      },
    };
    const wrapper = mount(<Admin {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
