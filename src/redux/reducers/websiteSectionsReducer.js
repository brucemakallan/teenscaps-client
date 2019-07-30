import { toast } from 'react-toastify';
import types from '../actions';
import 'react-toastify/dist/ReactToastify.css';
import { serverResponses, messages } from '../../common';

export const initialState = {
  sections: [],
  section: {},
};

const sectionsReducer = (state = initialState, action) => {
  const { payload } = action;
  const { sections } = state;

  switch (action.type) {
  case types.GET_ALL_SECTIONS:
    return { ...state, sections: payload };
  case types.POST_NEW_SECTION:
    return { ...state, section: payload };
  case types.DELETE_SECTION: {
    const sectionsList = sections.filter(section => section._id !== payload._id);
    return { ...state, sections: sectionsList };
  }
  case types.ERROR: {
    if (String(payload).includes(serverResponses.DUPLICATE)) toast.error(messages.DUPLICATE_MESSAGE);
    else toast.error(payload);
    return state;
  }
  case types.SUCCESS: {
    toast.success(payload);
    return state;
  }
  default: return state;
  }
};

export default sectionsReducer;
