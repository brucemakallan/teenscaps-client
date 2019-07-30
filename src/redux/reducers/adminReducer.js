import types from '../actions';

export const initialState = {
  admin: {},
};

const adminReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
  case types.LOGIN: {
    localStorage.setItem('teenscaps-email', payload.email);
    localStorage.setItem('teenscaps-token', payload.token);
    return { ...state, admin: payload };
  }
  default: return state;
  }
};

export default adminReducer;
