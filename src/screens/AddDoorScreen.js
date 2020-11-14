import React, {useLayoutEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {THEME} from '../theme';
import {AppBar, AppButton, AppText, AppTextInput} from '../components/uikit/';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDoor} from '../store/actions/doors';

const AddDoorScreen = ({navigation}) => {
  const {container, btn, inputId, inputP, inputs} = styles;
  const user = useSelector((state) => state.auth.user);
  const doors = useSelector((state) => state.doors.doors);
  const dispatch = useDispatch();
  const user_doors = useSelector((state) => state.doors.user_doors);
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const addDoor = () => {
    console.log(user_doors);
    let isAdded = false;
    for (let i in user_doors) {
      if (user_doors[i].key === id) {
        console.log('Эта дверь уже добавлена!');
        isAdded = true;
        break;
      } else {
        isAdded = false;
      }
    }
    if (!isAdded) {
      console.log(doors);
      for (let item in doors) {
        if (doors[item].key === id) {
          if (pass === doors[item].pass) {
            dispatch(setUserDoor(user.uid, 'house', id));
            navigation.navigate('main');
          }
        }
      }
    }
  };
  return (
    <View style={container}>
      <AppBar
        text={'Добавьте дверь'}
        leftBtnName={'arrow-back-outline'}
        leftBtnOnPress={() => navigation.goBack()}
      />
      <View style={inputs}>
        <AppTextInput
          style={inputId}
          type="email"
          placeHolder="ID"
          onChange={(text) => setId(text)}
        />
        <AppTextInput
          style={inputP}
          type="pass"
          placeHolder="PASSWORD"
          onChange={(text) => setPass(text)}
        />
      </View>
      <View style={btn}>
        <AppButton text={'Добавить'} onPress={addDoor} />
      </View>

      <StatusBar backgroundColor={THEME.MAIN_COLOR} />
    </View>
  );
};
const styles = StyleSheet.create({
  inputId: {marginBottom: 30, marginTop: 'auto'},
  inputP: {marginBottom: 100},
  inputs: {marginTop: 'auto', alignItems: 'center'},
  btn: {alignItems: 'center', marginBottom: 'auto'},
  container: {
    flex: 1,
  },
});
export default AddDoorScreen;
