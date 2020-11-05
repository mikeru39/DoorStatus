import React, {useLayoutEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {THEME} from '../theme';
import {AppBar, AppButton, AppText, AppTextInput} from '../components/uikit/';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const AddDoorScreen = ({navigation}) => {
  const {container, btn, inputId, inputP, inputs} = styles;
  const user = useSelector((state) => state.auth.user);
  const [Id, setId] = useState('');
  const [pass, setPass] = useState('');
  const addDoor = () => {
    console.log(Id, pass);
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
