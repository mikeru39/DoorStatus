import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {THEME} from '../../theme';

const HeaderButtons = ({side = 'r', name, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: side === 'r' ? 15 : 0,
        marginLeft: side === 'l' ? 15 : 0,
      }}
      onPress={() => onPress()}>
      <Icon name={name} color={THEME.TEXT_MAIN_COLOR} size={28} />
    </TouchableOpacity>
  );
};

export default HeaderButtons;
