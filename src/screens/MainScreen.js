import React, {useEffect, useState} from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import {THEME} from '../theme';
import DoorCard from '../components/DoorCard';
import {AppBar, AppText} from '../components/uikit';
import {useDispatch, useSelector} from 'react-redux';
import {userSignOut} from '../store/actions/auth';
import {setDoorListener, setUserDoorsListener} from '../store/actions/doors';

const MainScreen = ({navigation}) => {
  const userId = useSelector((state) => state.auth.user.uid);
  const doors = useSelector((state) => state.doors.user_doors);
  const loadingU = useSelector((state) => state.doors.loadingU);
  // console.log(doors);
  const dispatch = useDispatch();
  const onPress = (id) => {
    const door = doors.filter((i) => i.key === id)[0];
    navigation.navigate('door', {
      door,
    });
  };
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
      {loadingU ? (
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
          keyExtractor={(item) => item.key}
        />
      )}
      <StatusBar backgroundColor={THEME.MAIN_COLOR} />
    </View>
  );
};

export default MainScreen;
