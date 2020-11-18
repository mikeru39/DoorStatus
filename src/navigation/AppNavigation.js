import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React, {useEffect, useRef, useState} from 'react';

import {AddDoorScreen, DoorScreen, UserDoors} from '../screens/door';
import {
  CreatePinCodeScreen,
  PinCodeScreen,
  SignUpScreen,
  SignInScreen,
} from '../screens/auth';
import {THEME} from '../theme';
import {AppState} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  authToken,
  loadPinCode,
  userObj,
  userSignOut,
} from '../store/actions/auth';
import auth from '@react-native-firebase/auth';
import {setUserDoorsListener} from '../store/actions/doors';

const MyTheme = {
  colors: {
    background: THEME.MAIN_COLOR,
  },
};

const Stack = createStackNavigator();
export const AppNavigation = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(newUser) {
    setUser(newUser);
    if (newUser) {
      dispatch(userObj(newUser));
      dispatch(setUserDoorsListener(newUser.uid));
    }
    if (initializing) {
      dispatch(loadPinCode());
      setInitializing(false);
    }
  }
  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  });
  const pin_code = useSelector((state) => state.auth.pinCode);
  const appState = useRef(AppState.currentState);
  const [_, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  });
  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      dispatch(authToken(false));
    }
    console.log('pin_code', pin_code);
    if (user && pin_code === '') {
      dispatch(userSignOut());
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };
  const auth_token = useSelector((state) => state.auth.auth_token);
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={user ? 'doors' : 'signIn'}
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          auth_token ? (
            <>
              <Stack.Screen component={UserDoors} name="doors" />
              <Stack.Screen component={AddDoorScreen} name="add" />
              <Stack.Screen component={DoorScreen} name="door" />
            </>
          ) : pin_code === '' ? (
            <Stack.Screen
              name="createPinCode"
              component={CreatePinCodeScreen}
            />
          ) : (
            <Stack.Screen component={PinCodeScreen} name="pinCode" />
          )
        ) : (
          <>
            <Stack.Screen name="signIn" component={SignInScreen} />
            <Stack.Screen name="signUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
