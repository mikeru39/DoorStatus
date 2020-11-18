import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Indicator} from '../uikit/';

const PinCode = ({len, color}) => {
  const [status, setStatus] = useState([false, false, false, false, false]);
  const {grid} = styles;
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
