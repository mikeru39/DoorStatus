import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';

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
import HeaderButtons from '../components/uikit/HeaderButtons';
import ChangeWifiScreen from '../screens/door/ChangeWifiScreen';

const MyTheme = {
  colors: {
    background: THEME.MAIN_COLOR,
  },
};
const AuthStack = createStackNavigator();
const DoorStack = createStackNavigator();
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
      {user ? (
        auth_token ? (
          <DoorStack.Navigator
            initialRouteName="doors"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1B1F26',
              },
              headerTintColor: THEME.TEXT_MAIN_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <DoorStack.Screen
              component={UserDoors}
              name="doors"
              options={{title: 'Мои двери'}}
            />
            <DoorStack.Screen
              component={AddDoorScreen}
              name="add"
              options={({navigation}) => ({
                title: 'Добавьте дверь',
                headerLeft: () => (
                  <HeaderButtons
                    name={'chevron-back'}
                    side={'l'}
                    onPress={() => navigation.goBack()}
                  />
                ),
              })}
            />
            <DoorStack.Screen
              component={DoorScreen}
              name="door"
              options={({navigation, route}) => ({
                title: route.params.door.name,
                headerLeft: () => (
                  <HeaderButtons
                    name={'chevron-back'}
                    side={'l'}
                    onPress={() => navigation.goBack()}
                  />
                ),
              })}
            />
          </DoorStack.Navigator>
        ) : pin_code === '' ? (
          <AuthStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <AuthStack.Screen
              name="createPinCode"
              component={CreatePinCodeScreen}
            />
          </AuthStack.Navigator>
        ) : (
          <AuthStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <AuthStack.Screen component={PinCodeScreen} name="pinCode" />
          </AuthStack.Navigator>
        )
      ) : (
        <AuthStack.Navigator
          initialRouteName="login"
          screenOptions={{
            headerShown: false,
          }}>
          <AuthStack.Screen name="login" component={SignInScreen} />
          <AuthStack.Screen name="signup" component={SignUpScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
