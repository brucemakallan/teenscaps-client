import React from 'react';
import { mount } from 'enzyme';
import InputForm from './form';
import { section } from '../../__mocks__';

describe('InputForm', () => {
  let props;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      onArrayChange: jest.fn(),
      removeRow: jest.fn(),
      addRow: jest.fn(),
      addCloudinaryImage: jest.fn(),
      onSubmit: jest.fn(),
      entity: section,
      addCloudinaryRawFile: jest.fn(),
      allEntities: [section],
      onTagAdd: jest.fn(),
      onTagDelete: jest.fn(),
      onTagDrag: jest.fn(),
    };
  });

  it('should render correctly', () => {
    const wrapper = mount(<InputForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
