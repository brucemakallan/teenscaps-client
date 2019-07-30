import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import ReadAllWebsiteSections from './table';
import { section } from '../../__mocks__';

describe('Website Sections', () => {
  const props = {
    data: [section],
    saveID: jest.fn(),
  };
  it('should render correctly', () => {
    const wrapper = mount(<BrowserRouter><ReadAllWebsiteSections {...props} /></BrowserRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});
