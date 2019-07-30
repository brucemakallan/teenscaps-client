import axios from 'axios';
import types, { handleException, showSuccess, showPageLoader } from '.';
import paths from '../../common';

export const addSectionsToState = payload => ({
  type: types.GET_ALL_SECTIONS,
  payload,
});
export const addOneSectionToState = payload => ({
  type: types.POST_NEW_SECTION,
  payload,
});
export const removeSectionFromState = payload => ({
  type: types.DELETE_SECTION,
  payload,
});

const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('teenscaps-token')}`,
  }
};

const handlePostAndEditResponse = (response, dispatch) => {
  dispatch(addOneSectionToState(response.data));
  dispatch(showSuccess());
};

const getAllSections = url => async (dispatch) => {
  dispatch(showPageLoader(true));
  return axios.get(url)
    .then((response) => {
      dispatch(addSectionsToState(response.data));
      dispatch(showPageLoader(false));
    })
    .catch((error) => {
      dispatch(showPageLoader(false));
      handleException(error, dispatch);
    });
};

export const postSection = (url, body, history, createAnother) => async (dispatch) => {
  dispatch(showPageLoader(true));
  const sectionBody = body;
  delete sectionBody.array;
  return axios.post(url, sectionBody, headers)
    .then((response) => {
      handlePostAndEditResponse(response, dispatch);
      dispatch(showPageLoader(false));
      if (!createAnother) history.goBack();
    })
    .catch((error) => {
      dispatch(showPageLoader(false));
      handleException(error, dispatch);
    });
};

export const editSection = (url, body, history) => async (dispatch) => {
  dispatch(showPageLoader(true));
  const sectionBody = body;
  delete sectionBody.array;
  return axios.put(url, sectionBody, headers)
    .then((response) => {
      handlePostAndEditResponse(response, dispatch);
      dispatch(showPageLoader(false));
      history.push(paths.dashboard.sections);
    })
    .catch((error) => {
      dispatch(showPageLoader(false));
      handleException(error, dispatch);
    });
};

export const deleteSection = url => async dispatch => axios.delete(url, headers)
  .then(response => dispatch(removeSectionFromState(response.data)))
  .catch(error => handleException(error, dispatch));

export default getAllSections;
