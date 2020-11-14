import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {AppTextInput, AppText, AppButton, AppBar} from '../components/uikit/';
import {THEME} from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../store/actions/auth';

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const loading = useSelector((state) => state.auth.loading);
  const err = useSelector((state) => state.auth.loginE);
  const onPress = async () => {
    dispatch(signIn(email, pass));
  };
  const {container, title, inputE, inputP, bottomBtn} = styles;
  return (
    <View style={container}>
      <AppBar text={'Вход'} />
      <View style={title}>
        <AppTextInput
          style={inputE}
          type="email"
          placeHolder="Enter your Email"
          onChange={(text) => setEmail(text)}
        />
        <AppTextInput
          style={inputP}
          type="pass"
          placeHolder="Enter your Password"
          onChange={(text) => setPass(text)}
        />
      </View>
      <AppButton
        text={loading ? 'loading' : 'Войти'}
        onPress={() => onPress()}
      />
      <AppText text={err} size={25} />
      <View style={bottomBtn}>
        <Icon.Button
          name={'arrow-right'}
          backgroundColor={THEME.MAIN_COLOR}
          color={THEME.TEXT_MAIN_COLOR}
          size={24}
          onPress={() => navigation.navigate('signup')}>
          <AppText text={'Регистрация'} size={18} />
        </Icon.Button>
      </View>
      <StatusBar backgroundColor={THEME.MAIN_COLOR} />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 'auto',
  },

  inputE: {marginBottom: 30},
  inputP: {marginBottom: 70},
  bottomBtn: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
    marginBottom: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
export default SignInScreen;
