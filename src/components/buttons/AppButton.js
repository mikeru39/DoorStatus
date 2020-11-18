import React, {useState} from 'react';
import {TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {THEME} from '../../theme';
import {AppText} from '../uikit';
import {Neomorph} from 'react-native-neomorph-shadows';

const AppButton = ({onPress, text}) => {
  const {wrapper, button} = styles;
  const [btnState, setBtnState] = useState(false);
  const onPressHandler = (state) => {
    setBtnState(state);
    if (state) {
      onPress();
    }
  };
  return (
    <TouchableWithoutFeedback
      onPressIn={() => onPressHandler(true)}
      onPressOut={() => onPressHandler(false)}>
      <Neomorph style={button} inner={btnState}>
        <View style={wrapper}>
          <AppText text={text} size={20} />
        </View>
      </Neomorph>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: 'red',
    borderRadius: 25,
    // paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 15,
    height: 50,
    width: 170,
    shadowRadius: 5,
    backgroundColor: THEME.MAIN_COLOR,
  },
});
export default AppButton;
