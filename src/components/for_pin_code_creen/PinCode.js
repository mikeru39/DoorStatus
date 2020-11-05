import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Indicator} from '../uikit/';
import {Neomorph} from 'react-native-neomorph-shadows';
import {THEME} from '../../theme';
const windowWidth = Dimensions.get('window').width;

const PinCode = ({len, color}) => {
  const [status, setStatus] = useState([false, false, false, false, false]);
  const {container, grid} = styles;
  useEffect(() => {
    if (len > 0) {
      let i = 0;
      let newStatus = [];
      while (i < 5) {
        newStatus[i] = len > i;
        i++;
      }
      setStatus(newStatus);
    } else {
      setStatus([false, false, false, false]);
    }
  }, [len]);
  return (
    <View style={grid}>
      <Indicator color={color} status={status[0]} />
      <Indicator color={color} status={status[1]} />
      <Indicator color={color} status={status[2]} />
      <Indicator color={color} status={status[3]} />
      <Indicator color={color} status={status[4]} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: 240,
    height: 60,
    backgroundColor: THEME.MAIN_COLOR,
    shadowRadius: 7,
    borderRadius: 30,
  },
  grid: {
    flex: 1,
    width: '60%',
    height: 60,
    padding: 10,
    marginBottom: 20,
    borderRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default PinCode;
