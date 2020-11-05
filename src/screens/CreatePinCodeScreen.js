import React, {useState} from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import {PinCode, NumberPad} from '../components/for_pin_code_creen/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THEME} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Neomorph} from 'react-native-neomorph-shadows';
import {AppText} from '../components/uikit';
import {authToken, setPinCode} from '../store/actions/auth';

const CreatePinCodeScreen = ({navigation}) => {
  const [value, onChangeText] = useState('');
  const main_color = THEME.ACTIVE_COLOR;
  const [statusColor, setColor] = useState(main_color);
  const [title, setTitle] = useState('Создайте пин-код');
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const onPress = (id) => {
    const s = value.toString();
    const len = s.length;
    switch (id) {
      default:
        const newS = s + id.toString();
        if (len < 5) {
          onChangeText(newS);
          if (count === 1) {
            if (len === 4) {
              setPass1(newS);
              setTimeout(function () {
                onChangeText('');
                setCount(2);
              }, 1000);
            }
          } else {
            if (len === 4) {
              setPass2(newS);
              if (pass1 !== newS) {
                setCount(1);
                setPass1('');
                setPass2('');
              } else {
                console.log(newS);
                dispatch(setPinCode(newS));
              }
            }
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
            name={'create-outline'}
            size={65}
            color={THEME.ACTIVE_COLOR}
          />
        </Neomorph>
        <AppText text={title} color={THEME.TEXT_MAIN_COLOR} isBold size={18} />
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

export default CreatePinCodeScreen;
