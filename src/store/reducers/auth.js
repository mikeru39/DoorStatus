import {
  AUTH_TOKEN,
  LOAD_PIN_CODE,
  SET_USER,
  SET_PIN_CODE,
  USER_SIGN_OUT,
  SIGN_IN,
  SET_LOADING,
  SIGN_UP,
} from '../types';
const initialState = {
  auth_token: false,
  user: null,
  username: null,
  pinCode: null,
  loginE: null,
  signUpE: null,
  loading: false,
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
    case SIGN_UP:
      return {
        ...state,
        loading: false,
        signUpE: action.payload,
      };
    case SIGN_IN:
      return {
        ...state,
        loading: false,
        loginE: action.payload,
      };
    case LOAD_PIN_CODE:
      return {...state, pinCode: action.payload};
    case SET_LOADING:
      return {...state, loading: action.payload};
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
