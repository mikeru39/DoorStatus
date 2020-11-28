import React from 'react';
import {TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {THEME} from '../../theme';
import Loading from './Loading';
import AppText from './AppText';

const AppButton = ({loading, onPress, style, text}) => {
  const {wrapper} = styles;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{...wrapper, ...style}}>
        <AppText text={text} size={20} color={THEME.MAIN_COLOR} />
        {loading ? <Loading size="small" color={THEME.MAIN_COLOR} /> : <></>}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: THEME.TEXT_MAIN_COLOR,
  },
});
export default AppButton;
