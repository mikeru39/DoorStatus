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
import {Neomorph} from 'react-native-neomorph-shadows';

const AppTextInput = ({type = 'email', placeHolder, style, onChange}) => {
  const {textInput, input, button} = styles;
  const [status, setStatus] = useState(true);
  const [color, setColor] = useState(THEME.NO_ACTIVE_COLOR);
  const changeEye = () => {
    setStatus(!status);
  };
  const activeInput = (bool) => {
    setColor(bool ? THEME.ACTIVE_COLOR : THEME.NO_ACTIVE_COLOR);
  };
  const Wrapper =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  switch (type) {
    case 'pass':
      return (
        <Neomorph inner style={{...textInput, shadowRadius: 5, ...style}}>
          <Ionicons name={'lock-closed-outline'} size={24} color={color} />
          <TextInput
            secureTextEntry={status}
            style={input}
            placeholder={placeHolder}
            placeholderTextColor={color}
            selectionColor={color}
            onChangeText={onChange}
            onEndEditing={() => activeInput(false)}
            onFocus={() => activeInput(true)}
          />
          <Wrapper
            background={TouchableNativeFeedback.Ripple(
              THEME.RIPPLE_COLOR,
              true,
            )}
            onPress={changeEye}>
            <View style={button}>
              <Ionicons
                name={status ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color={color}
              />
            </View>
          </Wrapper>
        </Neomorph>
      );
    case 'email':
      return (
        <Neomorph inner style={{...textInput, shadowRadius: 5, ...style}}>
          <Ionicons name={'key-outline'} size={24} color={color} />
          <TextInput
            style={input}
            placeholder={placeHolder}
            placeholderTextColor={color}
            onChangeText={onChange}
            selectionColor={THEME.MAIN_COLOR}
            onEndEditing={() => activeInput(false)}
            onFocus={() => activeInput(true)}
          />
        </Neomorph>
      );
    case 'name':
      return (
        <Neomorph inner style={{...textInput, shadowRadius: 5, ...style}}>
          <Ionicons name={'person-outline'} size={24} color={color} />
          <TextInput
            style={input}
            placeholder={placeHolder}
            placeholderTextColor={color}
            onChangeText={onChange}
            selectionColor={THEME.MAIN_COLOR}
            onEndEditing={() => activeInput(false)}
            onFocus={() => activeInput(true)}
          />
        </Neomorph>
      );
  }
};
const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.MAIN_COLOR,
    width: 280,
    height: 56,
    borderRadius: 15,
  },
  input: {
    marginLeft: 5,
    width: 185,
    fontSize: 15,
    color: THEME.ACTIVE_COLOR,
    height: 48,
    fontFamily: 'Ubuntu-Regular',
  },
  button: {
    borderRadius: 12,
    marginLeft: 'auto',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
  },
});
export default AppTextInput;
