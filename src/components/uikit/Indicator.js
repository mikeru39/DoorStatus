import React, {useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {THEME} from '../../theme';

const Indicator = ({status, color}) => {
  const {circle} = styles;

  if (status) {
    return (
      <Neomorph
        style={{
          ...circle,
          backgroundColor: color,
          shadowRadius: 3,
        }}
      />
    );
  } else {
    return (
      <Neomorph
        style={{
          backgroundColor: THEME.MAIN_COLOR,
          shadowRadius: 3,
          height: 20,
          width: 20,
          borderRadius: 20,
        }}>
        <View style={{...circle, backgroundColor: THEME.MAIN_COLOR}} />
      </Neomorph>
    );
  }
};
const styles = StyleSheet.create({
  circle: {
    height: 20,
    width: 20,
    borderRadius: 20,
  },
});
export default Indicator;
