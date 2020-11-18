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
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {getError} from '../../constants';

export const authToken = (auth_token) => {
  return {
    type: AUTH_TOKEN,
    auth_token,
  };
};
export const userObj = (user) => {
  return {
    type: SET_USER,
    user,
  };
};
export const setPinCode = (pinCode) => {
  return async (dispatch) => {
    await AsyncStorage.setItem('@pinCode', pinCode);
    dispatch({
      type: SET_PIN_CODE,
      pinCode,
    });
  };
};

export const signUp = (pass1, pass2, name, email) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    if (pass1 && pass2 && name && email) {
      if (pass1 === pass2) {
        auth()
          .createUserWithEmailAndPassword(email, pass1)
          .then(() => {
            auth().currentUser.updateProfile({displayName: name});
            dispatch({
              type: SIGN_UP,
              error: '',
            });
          })
          .catch((error) => {
            dispatch({
              type: SIGN_UP,
              error: getError(error),
            });
          });
      } else {
        dispatch({
          type: SIGN_UP,
          error: 'Пароли не совпадают',
        });
      }
    } else {
      dispatch({
        type: SIGN_UP,
        error: 'Заполните все поля',
      });
    }
  };
};
export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

export const signIn = (email, pass) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    if (pass && email) {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          console.log('user sign in');
          dispatch({
            type: SIGN_IN,
            error: '',
          });
        })
        .catch((error) => {
          dispatch({
            type: SIGN_IN,
            error: getError(error),
          });
        });
    } else {
      dispatch({
        type: SIGN_IN,
        error: 'Заполните все поля',
      });
    }
  };
};
export const loadPinCode = () => {
  return async (dispatch) => {
    const pinCode = await AsyncStorage.getItem('@pinCode');
    console.log('loadPinCode', pinCode);
    if (pinCode !== null) {
      dispatch({
        type: LOAD_PIN_CODE,
        pinCode,
      });
    } else {
      dispatch({
        type: LOAD_PIN_CODE,
        pinCode: '',
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
          type: SIGN_OUT,
        });
      });
  };
};
