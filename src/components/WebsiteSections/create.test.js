import React from 'react';
import { mount } from 'enzyme';
import { CreateWebsiteSection } from './create';
import { section } from '../../__mocks__';

describe('CreateWebsiteSection', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    const createUploadWidget = (options, callback) => {
      callback(null, {
        event: 'success',
        info: { secure_url: 'https://sampleurl/image.jpg' },
      });
      return ({ open: jest.fn() });
    };
    global.cloudinary = {
      createUploadWidget,
    };
    props = {
      createSectionDispatch: jest.fn(),
      history: { push: jest.fn() },
      sections: [section],
    };
    wrapper = mount(
      <CreateWebsiteSection {...props} />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle an onChange', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'heading1', value: 'test' }
    };
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleOnChange');
    instance.forceUpdate();
    wrapper.update();
    wrapper.find('input#heading1').simulate('change', event);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle an onSubmit', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleSubmit');
    instance.forceUpdate();
    wrapper.update();
    wrapper.find('form#customInputForm').simulate('submit', event);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle handleOnArrayChange', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'title', value: 'test' }
    };
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleOnArrayChange');
    instance.forceUpdate();
    wrapper.update();
    wrapper.find('button#addRowBt').at(1).simulate('click');
    wrapper.find('input.files').at(0).simulate('change', event);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle removeRow', () => {
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'removeRow');
    instance.forceUpdate();
    wrapper.update();
    wrapper.find('button#addRowBt').at(2).simulate('click');
    wrapper.find('button#removeRowBt').at(0).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should handle addRow', () => {
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'addRow');
    instance.forceUpdate();
    wrapper.update();
    wrapper.find('button#addRowBt').at(2).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should handle addCloudinaryImage', () => {
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'addCloudinaryImage');
    instance.forceUpdate();
    wrapper.update();
    wrapper.find('button#addRowBt').at(0).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
