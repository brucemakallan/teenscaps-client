import sectionsReducer from './websiteSectionsReducer';
import types from '../actions';
import { section } from '../../__mocks__';
import { serverResponses } from '../../common';

describe('Sections Reducer', () => {
  let initialState;
  let initialStateWithSection;

  beforeEach(() => {
    initialState = {
      sections: [],
      section: {},
    };
    initialStateWithSection = {
      ...initialState,
      sections: [section],
    };
  });

  it('should return default state if improper action is provided', () => {
    const action = { type: 'value', payload: 'value' };
    expect(sectionsReducer(initialState, action))
      .toEqual(initialState);
  });

  it('should handle GET_ALL_SECTIONS', () => {
    const action = {
      type: types.GET_ALL_SECTIONS,
      payload: [section],
    };
    const expectedState = {
      ...initialState,
      sections: [section],
    };
    expect(sectionsReducer(initialState, action))
      .toEqual(expectedState);
  });

  it('should handle POST_NEW_SECTION', () => {
    const action = {
      type: types.POST_NEW_SECTION,
      payload: section,
    };
    const expectedState = {
      ...initialState,
      section,
    };
    expect(sectionsReducer(initialState, action))
      .toEqual(expectedState);
  });

  it('should handle DELETE_SECTION', () => {
    const action = {
      type: types.DELETE_SECTION,
      payload: section,
    };
    const expectedState = {
      sections: [],
      section: {},
    };
    expect(sectionsReducer(initialStateWithSection, action))
      .toEqual(expectedState);
  });

  it('should handle ERROR', () => {
    const action = {
      type: types.ERROR,
      payload: 'sample error',
    };
    const expectedState = {
      sections: [],
      section: {},
    };
    expect(sectionsReducer(initialState, action))
      .toEqual(expectedState);
  });

  it('should handle ERROR for duplicate value', () => {
    const action = {
      type: types.ERROR,
      payload: serverResponses.DUPLICATE,
    };
    const expectedState = {
      sections: [],
      section: {},
    };
    expect(sectionsReducer(initialState, action))
      .toEqual(expectedState);
  });

  it('should handle SUCCESS', () => {
    const action = {
      type: types.SUCCESS,
      payload: 'success message',
    };
    const expectedState = {
      sections: [],
      section: {},
    };
    expect(sectionsReducer(initialState, action))
      .toEqual(expectedState);
  });
});
