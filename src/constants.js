import database from '@react-native-firebase/database';
import {Dimensions} from 'react-native';

export const winW = Dimensions.get('window').width;
export const winH = Dimensions.get('window').height;

export const getError = (err) => {
  switch (err.code) {
    case 'auth/email-already-in-use':
      return 'Этот Email уже занят!';
    case 'auth/invalid-email':
      return 'Этот Email недействителен!';
    case 'auth/weak-password':
      return 'Пароль должен содержать больше 6 символов!';
    case 'auth/wrong-password':
      return 'Неверный email или пароль!';
    case 'auth/user-not-found':
      return 'Этого пользователя не существует';
    default:
      return err;
  }
};
export function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}
export const findIndexByProperty = (data, value) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key === value) {
      return i;
    }
  }
  return -1;
};

export const parseSnapshotDoors = (snapshot) => {
  let doors = [];
  for (let key in snapshot.val()) {
    doors.push({
      key,
      pass: snapshot.child(key).child('pass').val(),
    });
  }
  return doors;
};
export const parseSnapshotDoor = (snapshot, id) => {
  const day = new Date();
  let logs = [];
  for (let log in snapshot.child('log').val()) {
    const s = log.split('_');
    const logDay = new Date(
      parseInt(s[2]),
      parseInt(s[1]) - 1,
      parseInt(s[0]) + 7,
    );
    if (logDay >= day) {
      logs.push({
        log,
        status: snapshot.child('log').child(log).child('status').val(),
        device: snapshot.child('log').child(log).child('device').val(),
      });
    } else {
      database()
        .ref(`/doors/${id}/log/${log}`)
        .remove()
        .then((r) => console.log('log removed!'));
    }
  }
  return {
    key: id,
    isLock: snapshot.child('isLock').val(),
    pass: snapshot.child('pass').val(),
    status: snapshot.child('status').val(),
    log: logs,
  };
};
