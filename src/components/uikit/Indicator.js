import React from 'react';
import {View, StyleSheet} from 'react-native';

const Indicator = ({status, color}) => {
  const {circle} = styles;
  return (
    <View
      style={{
        ...circle,
        backgroundColor: status ? color : 'rgba(238, 238, 238, 0.2)',
      }}
    />
  );
};
const styles = StyleSheet.create({
  circle: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
  },
});
export default Indicator;
