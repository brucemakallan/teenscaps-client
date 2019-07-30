import { messages } from '../../common';

const types = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  SHOW_PAGE_LOADER: 'SHOW_PAGE_LOADER',
  GET_ALL_SECTIONS: 'GET_ALL_SECTIONS',
  POST_NEW_SECTION: 'POST_NEW_SECTION',
  DELETE_SECTION: 'DELETE_SECTION',
  LOGIN: 'LOGIN',
  SEND_EMAIL: 'SEND_EMAIL',
};

export const showError = payload => ({
  type: types.ERROR,
  payload: payload || messages.NETWORK_ERROR,
});

export const showSuccess = payload => ({
  type: types.SUCCESS,
  payload: payload || messages.SUCCESS,
});

export const showPageLoader = payload => ({
  type: types.SHOW_PAGE_LOADER,
  payload,
});

export const handleException = (error, dispatch) => {
  if (error && error.response && error.response.data && error.response.data.message) {
    dispatch(showError(error.response.data.message));
  } else dispatch(showError());
};

export default types;
