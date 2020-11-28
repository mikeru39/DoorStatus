import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {THEME} from '../../theme';
import {winW} from '../../constants';

const AppTextInput = ({
  type = 'email',
  iconName,
  placeHolder,
  style,
  onChange,
}) => {
  const {textInput, input, icon, button, buttonLayout} = styles;
  const [status, setStatus] = useState(true);
  const [color, setColor] = useState(THEME.NO_ACTIVE_COLOR);
  const changeEye = () => {
    setStatus(!status);
  };
  const activeInput = (bool) => {
    setColor(bool ? THEME.ACTIVE_COLOR : THEME.NO_ACTIVE_COLOR);
  };
  const OnClick =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={{...textInput, borderColor: color, ...style}}>
      <View style={icon}>
        <Ionicons name={iconName} size={24} color={color} />
      </View>
      <TextInput
        secureTextEntry={type === 'pass' ? status : false}
        style={input}
        placeholder={placeHolder}
        autoCapitalize="none"
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        placeholderTextColor={color}
        onChangeText={onChange}
        selectionColor={THEME.MAIN_COLOR}
        onEndEditing={() => activeInput(false)}
        onFocus={() => activeInput(true)}
      />
      {type === 'pass' ? (
        <View style={buttonLayout}>
          <OnClick
            background={TouchableNativeFeedback.Ripple(
              THEME.RIPPLE_COLOR,
              true,
            )}
            onPress={changeEye}>
            <View style={button}>
              <Ionicons
                name={status ? 'eye' : 'eye-off'}
                size={24}
                color={color}
              />
            </View>
          </OnClick>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.MAIN_COLOR,
    width: winW * 0.8,
    height: 56,
    borderRadius: 15,
  },
  icon: {flex: 1, padding: 12},
  input: {
    flex: 10,
    fontSize: 18,
    color: THEME.TEXT_MAIN_COLOR,
    fontFamily: 'Ubuntu-Regular',
  },
  buttonLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    padding: 12,
  },
  button: {
    borderRadius: 12,
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AppTextInput;
