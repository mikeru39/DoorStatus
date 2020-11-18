import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppText} from '../uikit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LogCard = ({time, status, device}) => {
  const {wrap, card, title, statuses} = styles;
  return (
    <View style={card}>
      <AppText text={`(${device}) ${time}`} size={18} />
      <Icon
        size={20}
        name={status === 1 ? 'lock-outline' : 'lock-open-outline'}
      />
    </View>
  );
};
export default LogCard;
const styles = StyleSheet.create({
  card: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 10,
    backgroundColor: 'red',
    marginRight: 10,
  },
  statuses: {
    marginTop: 10,
    justifyContent: 'center',
    padding: 20,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    alignSelf: 'flex-start',
  },
});
