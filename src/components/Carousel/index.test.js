import React from 'react';
import { mount } from 'enzyme';
import Carousel from '.';
import { section } from '../../__mocks__';

describe('Carousel', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Carousel id="sample-id" imageUrls={section.images} />);
    expect(wrapper).toMatchSnapshot();
  });
});
