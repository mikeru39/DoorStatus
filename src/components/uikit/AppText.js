import React from 'react';
import {Text} from 'react-native';
import {THEME} from '../../theme';

const AppText = ({
  isBold = false,
  text,
  color = THEME.TEXT_MAIN_COLOR,
  size,
}) => {
  return (
    <Text
      style={{
        color,
        fontSize: size,
        fontFamily: isBold ? 'Ubuntu-Bold' : 'Ubuntu-Regular',
      }}>
      {text}
    </Text>
  );
};
export default AppText;
