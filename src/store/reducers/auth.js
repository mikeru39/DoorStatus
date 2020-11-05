import {
  AUTH_TOKEN,
  LOAD_PIN_CODE,
  SET_USER,
  SET_PIN_CODE,
  USER_SIGN_OUT,
} from '../types';
const initialState = {
  auth_token: false,
  user: null,
  username: null,
  pinCode: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TOKEN:
      return {...state, auth_token: action.payload};
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        username: action.payload.displayName,
      };
    case LOAD_PIN_CODE:
      return {...state, pinCode: action.payload};
    case SET_PIN_CODE:
      return {
        ...state,
        pinCode: action.payload,
        auth_token: true,
      };
    case USER_SIGN_OUT:
      return {...state, auth_token: false, username: '', pinCode: ''};
    default:
      return state;
  }
};
