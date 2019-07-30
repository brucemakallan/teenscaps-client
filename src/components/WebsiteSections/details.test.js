import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Details from './details';
import { section } from '../../__mocks__';

describe('Website Section Details', () => {
  let props;
  let store;

  beforeEach(() => {
    props = {
      match: {
        params: {
          id: section._id,
        },
      },
      sections: [section],
      history: {
        goBack: jest.fn(),
      },
    };
    const initialState = {
      sectionsReducer: { sections: [section] },
    };
    const createStore = configureMockStore([thunk]);
    store = createStore(initialState);
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter><Details {...props} /></BrowserRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
