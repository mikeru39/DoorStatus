import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {AppTextInput, AppText, AppButton, AppBar} from '../components/uikit/';
import {THEME} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../store/actions/auth';

const SignUpScreen = ({navigation}) => {
  const {container, title, inputE, inputP, btn} = styles;
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const loading = useSelector((state) => state.auth.loading);
  const err = useSelector((state) => state.auth.signUpE);
  const dispatch = useDispatch();
  const onPress = async () => {
    dispatch(signUp(pass1, pass2, name, email));
  };
  return (
    <View style={container}>
      <AppBar
        text={'Регистрация'}
        leftBtnName={'arrow-back'}
        leftBtnOnPress={() => navigation.goBack()}
      />
      <View style={title}>
        <AppTextInput
          style={inputE}
          type="name"
          placeHolder="Enter your Name"
          onChange={(text) => setName(text)}
        />
        <AppTextInput
          style={inputE}
          type="email"
          placeHolder="Enter your Email"
          onChange={(text) => setEmail(text)}
        />
        <AppTextInput
          style={inputE}
          type="pass"
          placeHolder="Enter your Password"
          onChange={(text) => setPass1(text)}
        />
        <AppTextInput
          style={inputP}
          type="pass"
          placeHolder="Confirm Password"
          onChange={(text) => setPass2(text)}
        />
      </View>
      <View style={btn}>
        <AppButton
          text={loading ? 'loading' : 'Отправить'}
          onPress={() => onPress()}
        />
      </View>
      <AppText text={err} color={'red'} />
      <StatusBar backgroundColor={THEME.MAIN_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  inputE: {marginBottom: 30},
  inputP: {marginBottom: 70},
  btn: {alignItems: 'center', marginBottom: 'auto'},

  container: {
    flex: 1,
  },
});

export default SignUpScreen;
