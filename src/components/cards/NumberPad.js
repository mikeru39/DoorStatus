import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../uikit/';
import {AppIconButton} from '../uikit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {THEME} from '../../theme';
import {winW} from '../../constants';

const NumberPad = ({onPress}) => {
  const {pad, grid, box} = styles;
  return (
    <View style={pad}>
      <View style={grid}>
        <AppIconButton title="1" onPress={() => onPress(1)} />
        <AppIconButton title="2" onPress={() => onPress(2)} />
        <AppIconButton title="3" onPress={() => onPress(3)} />
      </View>
      <View style={grid}>
        <AppIconButton title="4" onPress={() => onPress(4)} />
        <AppIconButton title="5" onPress={() => onPress(5)} />
        <AppIconButton title="6" onPress={() => onPress(6)} />
      </View>
      <View style={grid}>
        <AppIconButton title="7" onPress={() => onPress(7)} />
        <AppIconButton title="8" onPress={() => onPress(8)} />
        <AppIconButton title="9" onPress={() => onPress(9)} />
      </View>
      <View style={grid}>
        <View style={box}>
          <AppText text={'Забыли'} size={14} isBold />
          <AppText text={'Пароль'} size={14} isBold />
        </View>
        <AppIconButton title="0" onPress={() => onPress(0)} />
        <AppIconButton
          bg={'none'}
          title={<Ionicons name="backspace" size={30} />}
          onPress={() => onPress(10)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 65,
    marginBottom: 95,
  },
  pad: {
    marginTop: 50,
    width: winW * 0.7,
  },
  box: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default NumberPad;
