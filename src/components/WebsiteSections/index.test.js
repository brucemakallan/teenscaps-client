import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { WebsiteSections } from '.';
import { section } from '../../__mocks__';

describe('Website Sections', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      getAllSectionsDispatch: jest.fn(),
      deleteSectionDispatch: jest.fn(),
      sections: [section],
    };
    wrapper = mount(
      <BrowserRouter>
        <WebsiteSections {...props} />
      </BrowserRouter>
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle saveID', () => {
    const instance = wrapper.find('WebsiteSections').at(0).instance();
    const spy = jest.spyOn(instance, 'saveID');
    instance.forceUpdate();
    wrapper.update();
    wrapper.find('button#deleteBt').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
