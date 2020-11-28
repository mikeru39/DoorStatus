import React from 'react';

import {ActivityIndicator} from 'react-native';
import {THEME} from '../../theme';

const Loading = ({size, color = THEME.TEXT_MAIN_COLOR}) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default Loading;
