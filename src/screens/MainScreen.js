import React, {useEffect, useState} from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import {THEME} from '../theme';
import DoorCard from '../components/DoorCard';
import {AppBar, AppText} from '../components/uikit';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {userSignOut} from '../store/actions/auth';

const MainScreen = ({navigation}) => {
  const userId = useSelector((state) => state.auth.user.uid);
  const [doorsKeys, setDoorsKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const onValueChange = database()
      .ref(`/users/${userId}/devices/`)
      .on('value', (userSnapshot) => {
        let values = [];
        for (let key in userSnapshot.val()) {
          values.push({
            key,
            name: userSnapshot.child(key).child('name').val(),
          });
        }
        setDoorsKeys(values);
        setLoading(false);
      });
    return () => database().ref(`/users/${userId}`).off('value', onValueChange);
  }, [userId]);
  return (
    <View style={{flex: 1}}>
      <AppBar
        text={'Мои двери'}
        leftBtnName={'menu-outline'}
        leftBtnOnPress={() => {
          dispatch(userSignOut());
        }}
        rightBtnName={'add-outline'}
        rightBtnOnPress={() => navigation.navigate('add')}
      />
      {loading ? (
        <AppText text={'loading'} size={20} />
      ) : (
        <FlatList
          style={{
            height: '100%',
          }}
          data={doorsKeys}
          renderItem={(item) => (
            <DoorCard id={item.item.key} name={item.item.name} />
          )}
          keyExtractor={(item) => item.key}
        />
      )}

      <StatusBar backgroundColor={THEME.MAIN_COLOR} />
    </View>
  );
};

export default MainScreen;
