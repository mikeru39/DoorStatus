import React from 'react';
import {View, StyleSheet} from 'react-native';
import {THEME} from '../../theme';
import {AppText} from './';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIconButton from './AppIconButton';

const AppBar = ({
  text,
  leftBtnName = '',
  leftBtnOnPress,
  rightBtnName = '',
  rightBtnOnPress,
}) => {
  const {bar, box, title} = styles;
  return (
    <View style={bar}>
      {leftBtnName !== '' ? (
        <AppIconButton
          onPress={() => leftBtnOnPress()}
          title={<Icon name={leftBtnName} size={24} />}
        />
      ) : (
        <View style={box} />
      )}
      <View style={title}>
        <AppText text={text} size={28} />
      </View>
      {rightBtnName !== '' ? (
        <AppIconButton
          onPress={() => rightBtnOnPress()}
          title={<Icon name={rightBtnName} size={24} />}
        />
      ) : (
        <View style={box} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: THEME.MAIN_COLOR,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  box: {
    width: 50,
    height: 50,
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
export default AppBar;
