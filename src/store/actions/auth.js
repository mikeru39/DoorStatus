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
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {getError} from '../../constants';

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
export const setLoading = (state) => {
  return {type: SET_LOADING, payload: state};
};

export const signUp = (pass1, pass2, name, email) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING,
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
              payload: '',
            });
          })
          .catch((error) => {
            dispatch({
              type: SIGN_UP,
              payload: getError(error),
            });

            // if (error.code === 'auth/email-already-in-use') {
            //   dispatch({
            //     type: SIGN_UP,
            //     payload: {
            //       error: 'Этот Email уже занят!',
            //       crash: true,
            //     },
            //   });
            // }
            //
            // if (error.code === 'auth/invalid-email') {
            //   dispatch({
            //     type: SIGN_UP,
            //     payload: {
            //       error: 'Этот Email недействителен!',
            //       crash: true,
            //     },
            //   });
            // }
            // if (error.code === 'auth/weak-password') {
            //   dispatch({
            //     type: SIGN_UP,
            //     payload: {
            //       error: 'Пароль должен содержать больше 6 символов!',
            //       crash: true,
            //     },
            //   });
            // }
          });
      } else {
        dispatch({
          type: SIGN_UP,
          payload: 'Пароли не совпадают',
        });
      }
    } else {
      dispatch({
        type: SIGN_UP,
        payload: 'Заполните все поля',
      });
    }
  };
};

export const signIn = (email, pass) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });

    if (pass && email) {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          console.log('user sign in');
          dispatch({
            type: SIGN_IN,
            payload: '',
          });
        })
        .catch((error) => {
          dispatch({
            type: SIGN_IN,
            payload: getError(error),
          });
        });
    } else {
      dispatch({
        type: SIGN_IN,
        payload: 'Заполните все поля',
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
