import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {AppTextInput, AppText, AppButton, AppBar} from '../components/uikit/';
import {THEME} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

const SignUpScreen = ({navigation}) => {
  const {container, title, inputE, inputP, btn} = styles;
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const signUp = () => {
    if (pass1 && pass2 && name && email) {
      if (pass1 === pass2) {
        auth()
          .createUserWithEmailAndPassword(email, pass1)
          .then(() => {
            auth().currentUser.updateProfile({displayName: name});
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              setError('Этот Email уже занят!');
            }

            if (error.code === 'auth/invalid-email') {
              setError('Этот Email недействителен!');
            }
            if (error.code === 'auth/weak-password') {
              setError('Пароль должен содержать больше 6 символов!');
            }
          });
        setError('');
      } else {
        setError('Пароли не совпадают');
      }
    } else {
      setError('Заполните все поля');
    }
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
        <AppButton text={'Отправить'} onPress={() => signUp()} />
      </View>
      <AppText text={error} color={'red'} />
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
