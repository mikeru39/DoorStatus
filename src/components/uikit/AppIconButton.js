import {
  StyleSheet,
  TouchableNativeFeedback,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AppText from './AppText';
import {THEME} from '../../theme';
import React from 'react';

const AppIconButton = ({
  title,
  onPress,
  size = 60,
  bg = 'rgba(27, 31, 38, 0.7)',
}) => {
  const {button} = styles;
  const Wrapper =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <View
      style={{
        ...button,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
      }}>
      <Wrapper
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(
          THEME.TEXT_MAIN_COLOR,
          true,
        )}>
        <View
          style={{
            width: '100%',
            height: '100%',
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppText
            text={title}
            size={26}
            isBold={true}
            color={THEME.TEXT_MAIN_COLOR}
          />
        </View>
      </Wrapper>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AppIconButton;
