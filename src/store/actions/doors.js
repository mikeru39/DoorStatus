import database from '@react-native-firebase/database';
import {
  LOAD_DOORS,
  DOOR_LISTENER,
  LOADING_DOORS,
  LOADING_USER_DOORS,
  LOAD_USER_DOORS,
  ADD_DOOR,
} from '../types';
import {parseSnapshotDoor, parseSnapshotDoors} from '../../constants';

export const setUserDoor = (userId, name, doorId) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_DOORS,
      isLoading: true,
    });
    database()
      .ref(`/users/${userId}/devices/${doorId}`)
      .set({name})
      .then(() =>
        dispatch({
          type: ADD_DOOR,
          error: '',
        }),
      );
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
      type: LOADING_DOORS,
      isLoading: true,
    });
    database()
      .ref(`/doors/${doorId}/`)
      .on('value', (snapshot) => {
        let door = parseSnapshotDoor(snapshot, doorId);
        dispatch({
          type: DOOR_LISTENER,
          door,
        });
      });
  };
};
export const getDoors = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_DOORS,
      payload: true,
    });
    await database()
      .ref('/doors/')
      .once('value', (snapshot) => {
        let doors = parseSnapshotDoors(snapshot);
        console.log('doooors', doors);
        dispatch({
          type: LOAD_DOORS,
          doors,
        });
      });
  };
};
export const setUserDoorsListener = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_USER_DOORS,
      isLoading: true,
    });
    database()
      .ref(`/users/${userId}/devices/`)
      .on('value', (userSnapshot) => {
        let doors = [];
        for (let key in userSnapshot.val()) {
          doors.push({
            key,
            name: userSnapshot.child(key).child('name').val(),
          });
        }
        dispatch({
          type: LOAD_USER_DOORS,
          doors,
        });
      });
  };
};
