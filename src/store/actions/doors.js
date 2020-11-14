import database from '@react-native-firebase/database';
import {
  GET_DOORS,
  SET_DOOR_LISTENER,
  SET_LOADING_DOORS,
  SET_LOADING_USER_DOORS,
  SET_USER_DOORS,
} from '../types';
import {parseSnapshotDoor, parseSnapshotDoors} from '../../constants';

export const setUserDoor = (userId, name, doorId) => {
  return async () => {
    database()
      .ref(`/users/${userId}/devices/${doorId}`)
      .set({name})
      .then(() => console.log('set door'));
  };
};
export const changeDoorStatus = (isLock, doorId) => {
  return async () => {
    const date = new Date();
    const formDate = `${date.getDate()}_${
      date.getMonth() + 1
    }_${date.getFullYear()}__${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
    database()
      .ref(`/doors/${doorId}/`)
      .update({isLock: isLock})
      .then(() => console.log(formDate));
    database()
      .ref(`/doors/${doorId}/log/${formDate}`)
      .set({device: 'A515', status: isLock})
      .then(() => console.log('set door log'));
  };
};

export const setDoorListener = (doorId) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_DOORS,
      payload: true,
    });
    database()
      .ref(`/doors/${doorId}/`)
      .on('value', (snapshot) => {
        let values = parseSnapshotDoor(snapshot, doorId);
        dispatch({
          type: SET_DOOR_LISTENER,
          payload: values,
        });
      });
  };
};
export const GetDoors = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_DOORS,
      payload: true,
    });
    database()
      .ref('/doors/')
      .on('value', (snapshot) => {
        let values = parseSnapshotDoors(snapshot);
        dispatch({
          type: GET_DOORS,
          payload: values,
        });
      });
  };
};
export const setUserDoorsListener = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_USER_DOORS,
      payload: true,
    });
    database()
      .ref(`/users/${userId}/devices/`)
      .on('value', (userSnapshot) => {
        let values = [];
        for (let key in userSnapshot.val()) {
          values.push({
            key,
            name: userSnapshot.child(key).child('name').val(),
          });
        }
        dispatch({
          type: SET_USER_DOORS,
          payload: values,
        });
      });
  };
};
