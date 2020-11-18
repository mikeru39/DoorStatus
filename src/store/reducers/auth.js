import {
  AUTH_TOKEN,
  LOAD_PIN_CODE,
  SET_USER,
  SET_PIN_CODE,
  SIGN_OUT,
  SIGN_IN,
  LOADING,
  SIGN_UP,
  CLEAR_ERROR,
} from '../types';
const initialState = {
  auth_token: false,
  user: null,
  username: null,
  pinCode: null,
  error: null,
  loading: false,
};
const handlers = {
  [AUTH_TOKEN]: (state, {auth_token}) => ({...state, auth_token}),
  [LOADING]: (state, {loading}) => ({...state, loading}),
  [SET_USER]: (state, {user}) => ({...state, user, username: user.displayName}),
  [SIGN_UP]: (state, {error}) => ({
    ...state,
    loading: false,
    error,
  }),
  [SIGN_IN]: (state, {error}) => ({
    ...state,
    loading: false,
    error,
  }),
  [SIGN_OUT]: (state) => ({
    ...state,
    auth_token: false,
    username: '',
    pinCode: '',
  }),
  [LOAD_PIN_CODE]: (state, {pinCode}) => ({...state, pinCode}),
  [SET_PIN_CODE]: (state, {pinCode}) => ({...state, pinCode, auth_token: true}),
  [CLEAR_ERROR]: (state) => ({...state, error: null}),
  DEFAULT: (state) => state,
};
export const authReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
