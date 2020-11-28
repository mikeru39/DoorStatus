import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, Image, View} from 'react-native';
import {AppText, AppTextInput} from '../../components/uikit';
import {AppButton} from '../../components/uikit';
import {useDispatch, useSelector} from 'react-redux';
import {setLoadingUserDoors, setUserDoor} from '../../store/actions/doors';

const AddDoorScreen = ({navigation}) => {
  const {container, btn, inputId, inputP, inputs} = styles;
  const user = useSelector((state) => state.auth.user);
  const doors = useSelector((state) => state.doors.allDoors);
  const dispatch = useDispatch();
  const user_doors = useSelector((state) => state.doors.user_doors);
  const loading = useSelector((state) => state.doors.loadingUserDoors);
  const [id, setId] = useState('');
  const [err, setErr] = useState('');
  const [name, setName] = useState('');
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
      let count = 0;
      for (let item in doors) {
        if (doors[item].key === id) {
          if (pass === doors[item].pass) {
            dispatch(setLoadingUserDoors(true));
            dispatch(setUserDoor(user.uid, name, id));
            count++;
          }
        }
      }
      if (count !== 1) {
        setErr('Неверный ID или Пароль');
      }
    } else {
      setErr('Эта дверь уже добавлена');
    }
  };
  return (
    <View style={container}>
      <View style={{marginTop: 'auto', alignItems: 'center'}}>
        <Image
          source={require('../../img/add.png')}
          style={{height: 83, width: 166}}
        />
      </View>
      <View style={inputs}>
        <AppTextInput
          iconName={'tablet-portrait'}
          style={inputId}
          type="Name"
          placeHolder="Name"
          onChange={(text) => setName(text)}
        />
        <AppTextInput
          iconName={'key'}
          style={inputId}
          type="ID"
          placeHolder="ID"
          onChange={(text) => setId(text)}
        />
        <AppTextInput
          iconName={'keypad'}
          style={inputP}
          type="pass"
          placeHolder="PASSWORD"
          onChange={(text) => setPass(text)}
        />
      </View>
      <View style={btn}>
        <AppButton loading={loading} text={'Добавить'} onPress={addDoor} />
        <View style={{marginTop: 10}}>
          <AppText text={err} size={16} color={'red'} />
        </View>
      </View>

      <StatusBar backgroundColor={'#1B1F26'} />
    </View>
  );
};
const styles = StyleSheet.create({
  inputId: {marginBottom: 20},
  inputP: {marginBottom: 'auto'},
  inputs: {marginTop: 'auto', marginBottom: 20, alignItems: 'center'},
  btn: {alignItems: 'center', marginBottom: 'auto', marginTop: 10},
  container: {
    flex: 1,
  },
});
export default AddDoorScreen;
