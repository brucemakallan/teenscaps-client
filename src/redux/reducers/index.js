import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import sectionsReducer from './websiteSectionsReducer';
import adminReducer from './adminReducer';
import emailReducer from './emailReducer';

export default combineReducers({
  loaderReducer,
  sectionsReducer,
  adminReducer,
  emailReducer,
});
