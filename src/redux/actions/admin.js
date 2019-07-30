import axios from 'axios';
import types, { handleException, showPageLoader } from '.';
import paths from '../../common';

const login = (url, body, history) => async (dispatch) => {
  dispatch(showPageLoader(true));
  return axios.post(url, body)
    .then((response) => {
      dispatch({ type: types.LOGIN, payload: response.data });
      dispatch(showPageLoader(false));
      history.push(paths.dashboard.sections);
    })
    .catch((error) => {
      dispatch(showPageLoader(false));
      handleException(error, dispatch);
    });
};

export default login;
