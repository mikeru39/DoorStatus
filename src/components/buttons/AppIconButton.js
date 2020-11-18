import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {AppText} from '../uikit';
import {THEME} from '../../theme';
import React, {useState} from 'react';

const AppIconButton = ({title, onPress, size = 50}) => {
  const {button} = styles;
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
      <Neomorph style={{...button, width: size, height: size}} inner={btnState}>
        <AppText
          text={title}
          size={26}
          isBold={true}
          color={THEME.TEXT_MAIN_COLOR}
        />
      </Neomorph>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  button: {
    shadowRadius: 5,
    borderRadius: 15,
    backgroundColor: THEME.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AppIconButton;
