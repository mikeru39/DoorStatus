import React, {useEffect, useState} from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import {PinCode, NumberPad} from '../components/for_pin_code_creen/';
import {THEME} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import {authToken} from '../store/actions/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Neomorph} from 'react-native-neomorph-shadows';
import {AppText} from '../components/uikit';
const PinCodeScreen = () => {
  const user = useSelector((state) => state.auth.username);
  const pinCode = useSelector((state) => state.auth.pinCode);
  const [value, onChangeText] = useState('');
  const main_color = THEME.ACTIVE_COLOR;
  const [statusColor, setColor] = useState(main_color);
  const dispatch = useDispatch();
  const onPress = (id) => {
    const s = value.toString();
    const len = s.length;
    switch (id) {
      default:
        if (len < 5) {
          console.log(s + id.toString());
          onChangeText(s + id.toString());
        }
        if ((s + id.toString()).length === 5) {
          if (s + id.toString() === pinCode) {
            setColor('#4ac129');
            setTimeout(function () {
              dispatch(authToken(true));
            }, 1000);
          } else {
            setColor('#ff0808');
          }
        }
        break;
      case 10:
        if (len > 0) {
          onChangeText(s.substring(0, s.length - 1));
          setColor(main_color);
        }
        break;
    }
  };
  const {container, grid} = styles;
  return (
    <View style={container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Neomorph
          style={{
            backgroundColor: THEME.MAIN_COLOR,
            shadowRadius: 7,
            height: 105,
            width: 100,
            borderRadius: 45,
            marginLeft: 'auto',
            marginRight: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Ionicons
            name={'person-outline'}
            size={65}
            color={THEME.ACTIVE_COLOR}
          />
        </Neomorph>
        <AppText text={user} color={THEME.TEXT_MAIN_COLOR} isBold size={18} />
      </View>
      <View style={grid}>
        <PinCode len={value.length} color={statusColor} />
        <NumberPad onPress={onPress} />
      </View>
      <StatusBar backgroundColor={THEME.MAIN_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  grid: {
    alignItems: 'center',
  },
});

export default PinCodeScreen;
