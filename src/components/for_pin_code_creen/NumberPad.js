import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText, PinCodeButton} from '../uikit/';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {THEME} from '../../theme';

const NumberPad = ({onPress}) => {
  const {pad, grid, box} = styles;
  return (
    <View style={pad}>
      <View style={grid}>
        <PinCodeButton title="1" onPress={() => onPress(1)} />
        <PinCodeButton title="2" onPress={() => onPress(2)} />
        <PinCodeButton title="3" onPress={() => onPress(3)} />
      </View>
      <View style={grid}>
        <PinCodeButton title="4" onPress={() => onPress(4)} />
        <PinCodeButton title="5" onPress={() => onPress(5)} />
        <PinCodeButton title="6" onPress={() => onPress(6)} />
      </View>
      <View style={grid}>
        <PinCodeButton title="7" onPress={() => onPress(7)} />
        <PinCodeButton title="8" onPress={() => onPress(8)} />
        <PinCodeButton title="9" onPress={() => onPress(9)} />
      </View>
      <View style={grid}>
        <View style={box}>
          <AppText text={'Забыли'} size={14} isBold />
          <AppText text={'Пароль'} size={14} isBold />
        </View>
        <PinCodeButton title="0" onPress={() => onPress(0)} />
        <View style={box}>
          <Ionicons.Button
            onPress={() => onPress(10)}
            name="arrow-back-outline"
            size={40}
            color={THEME.TEXT_MAIN_COLOR}
            backgroundColor={THEME.MAIN_COLOR}
          />
        </View>
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
    width: '70%',
  },
  box: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default NumberPad;
