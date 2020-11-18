import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {THEME} from '../../theme';
import {AppBar, AppTextInput} from '../../components/uikit';
import {AppButton} from '../../components/buttons';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDoor} from '../../store/actions/doors';

const AddDoorScreen = ({navigation}) => {
  const {container, btn, inputId, inputP, inputs} = styles;
  const user = useSelector((state) => state.auth.user);
  const doors = useSelector((state) => state.doors.allDoors);
  const dispatch = useDispatch();
  const user_doors = useSelector((state) => state.doors.user_doors);
  const loading = useSelector((state) => state.doors.loadingDoor);
  const [id, setId] = useState('');
  const [prevLoading, setLoading] = useState('');
  const [pass, setPass] = useState('');
  useEffect(() => {
    if (!loading && prevLoading) {
      navigation.navigate('doors');
    } else {
      setLoading(loading);
    }
  }, [loading, prevLoading, navigation]);
  const addDoor = async () => {
    let isAdded = false;
    for (let i in user_doors) {
      if (user_doors[i].key === id) {
        isAdded = true;
        break;
      } else {
        isAdded = false;
      }
    }
    if (!isAdded) {
      for (let item in doors) {
        if (doors[item].key === id) {
          if (pass === doors[item].pass) {
            console.log('add');
            dispatch(setUserDoor(user.uid, 'house', id));
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
        <AppButton
          text={loading ? 'loading' : 'Добавить'}
          onPress={() => addDoor()}
        />
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
