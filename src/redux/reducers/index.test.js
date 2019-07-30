import { initialState as loaderState } from './loaderReducer';
import { initialState as sectionsState } from './websiteSectionsReducer';
import { initialState as adminState } from './adminReducer';
import { initialState as emailState } from './emailReducer';

import combinedReducers from '.';

describe('Loader Reducers', () => {
  it('should return default state if improper action is provided', () => {
    expect(combinedReducers(undefined, {}))
      .toEqual({
        loaderReducer: loaderState,
        sectionsReducer: sectionsState,
        adminReducer: adminState,
        emailReducer: emailState,
      });
  });
});
