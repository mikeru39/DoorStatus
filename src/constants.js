import database from '@react-native-firebase/database';

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
export const parseSnapshotDoors = (snapshot) => {
  let values = [];
  const day = new Date().getDate();
  for (let key in snapshot.val()) {
    let logs = [];
    for (let log in snapshot.child(key).child('log').val()) {
      if (parseInt(log.split('_')[0]) >= day - 6) {
        console.log(log);
        logs.push({
          log,
          status: snapshot
            .child(key)
            .child('log')
            .child(log)
            .child('status')
            .val(),
          device: snapshot
            .child(key)
            .child('log')
            .child(log)
            .child('device')
            .val(),
        });
      } else {
        database().ref(`/doors/${key}/log/${log}`).remove();
      }
    }
    values.push({
      key,
      isLock: snapshot.child(key).child('isLock').val(),
      pass: snapshot.child(key).child('pass').val(),
      status: snapshot.child(key).child('status').val(),
      log: logs,
    });
  }
  return values;
};
export const parseSnapshotDoor = (snapshot, id) => {
  const day = new Date().getDate();
  let logs = [];
  for (let log in snapshot.child('log').val()) {
    if (parseInt(log.split('_')[0]) >= day - 6) {
      logs.push({
        log,
        status: snapshot.child('log').child(log).child('status').val(),
        device: snapshot.child('log').child(log).child('device').val(),
      });
    } else {
      database().ref(`/doors/${id}/log/${log}`).remove();
    }
  }
  console.log('door', snapshot);
  return {
    key: id,
    isLock: snapshot.child('isLock').val(),
    pass: snapshot.child('pass').val(),
    status: snapshot.child('status').val(),
    log: logs,
  };
};
