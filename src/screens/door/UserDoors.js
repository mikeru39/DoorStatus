import React from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import {THEME} from '../../theme';
import DoorCard from '../../components/cards/DoorCard';
import {AppBar, AppText} from '../../components/uikit';
import {useDispatch, useSelector} from 'react-redux';
import {userSignOut} from '../../store/actions/auth';
import {getDoors, setUserDoorsListener} from '../../store/actions/doors';

const UserDoors = ({navigation}) => {
  const doors = useSelector((state) => state.doors.user_doors);
  const loading = useSelector((state) => state.doors.loadingUserDoors);
  const dispatch = useDispatch();
  const onPress = (id) => {
    const door = doors.filter((i) => i.key === id)[0];
    navigation.navigate('door', {
      door,
    });
  };
  console.log(doors);
  return (
    <View style={{flex: 1}}>
      <AppBar
        text={'Мои двери'}
        leftBtnName={'menu-outline'}
        leftBtnOnPress={() => {
          dispatch(userSignOut());
        }}
        rightBtnName={'add-outline'}
        rightBtnOnPress={() => {
          dispatch(getDoors());
          navigation.navigate('add');
        }}
      />
      {loading ? (
        <AppText text={'loading'} size={20} />
      ) : (
        <FlatList
          style={{
            height: '100%',
          }}
          data={doors}
          renderItem={(item) => (
            <DoorCard
              id={item.item.key}
              onPress={(id) => onPress(id)}
              name={item.item.name}
            />
          )}
          keyExtractor={(item) => {
            return item.key;
          }}
        />
      )}
      <StatusBar backgroundColor={THEME.MAIN_COLOR} />
    </View>
  );
};

export default UserDoors;
