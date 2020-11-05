import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {THEME} from '../../theme';
import {AppText} from './';
import {Neomorph} from 'react-native-neomorph-shadows';

const PinCodeButton = ({title, onPress}) => {
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
      <Neomorph style={button} inner={btnState}>
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
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default PinCodeButton;
