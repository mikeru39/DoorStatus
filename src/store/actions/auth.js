import {
  AUTH_TOKEN,
  LOAD_PIN_CODE,
  SET_USER,
  SET_PIN_CODE,
  USER_SIGN_OUT,
} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
export const authToken = (status) => {
  return {
    type: AUTH_TOKEN,
    payload: status,
  };
};
export const userObj = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
export const setPinCode = (pinCode) => {
  return async (dispatch) => {
    await AsyncStorage.setItem('@pinCode', pinCode);
    dispatch({
      type: SET_PIN_CODE,
      payload: pinCode,
    });
  };
};

export const loadPinCode = () => {
  return async (dispatch) => {
    const pinCode = await AsyncStorage.getItem('@pinCode');
    console.log('loadPinCode', pinCode);
    if (pinCode !== null) {
      dispatch({
        type: LOAD_PIN_CODE,
        payload: pinCode,
      });
    } else {
      dispatch({
        type: LOAD_PIN_CODE,
        payload: '',
      });
    }
  };
};

export const userSignOut = () => {
  return async (dispatch) => {
    await AsyncStorage.setItem('@pinCode', '');
    await auth()
      .signOut()
      .then(() => {
        console.log('user sign out!');
        dispatch({
          type: USER_SIGN_OUT,
        });
      });
  };
};
export const login = (pass, email) => {
  return async (dispatch) => {
    await auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        dispatch({
          type: USER_SIGN_OUT,
        });
      });
  };
};
