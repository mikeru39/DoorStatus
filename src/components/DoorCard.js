import React, {useEffect, useState} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {AppText} from './uikit';
import {THEME} from '../theme';
import {Neomorph} from 'react-native-neomorph-shadows';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;

const DoorCard = ({id, name}) => {
  const {wrap, card, title, status, statuses} = styles;
  // const longPress = () => {
  //   if (doorState.status === 1) {
  //     switch (doorState.isLock) {
  //       case 0:
  //         database()
  //           .ref(`doors/${id}/`)
  //           .update({
  //             isLock: 1,
  //           })
  //           .then(() => console.log('Data set.'));
  //         break;
  //       case 1:
  //         database()
  //           .ref(`doors/${id}/`)
  //           .update({
  //             isLock: 0,
  //           })
  //           .then(() => console.log('Data set.'));
  //         break;
  //     }
  //   }
  // };
  const [doorState, setDoorState] = useState({});
  useEffect(() => {
    const onValueChange = database()
      .ref(`/doors/${id}`)
      .on('value', (snapshot) => {
        setDoorState(snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/doors/${id}`).off('value', onValueChange);
  }, [id]);
  return (
    <Neomorph style={card}>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1, y: 1}}
        colors={['#3d424b', '#33383f']}
        style={{
          borderRadius: 25,
          width: windowWidth * 0.8,
          height: '100%',
          padding: 20,
        }}>
        <View style={title}>
          <AppText text={name} size={24} />
        </View>
        <View style={wrap}>
          <View style={statuses}>
            <View style={status}>
              <AppText text={'Дверь: '} size={20} />
              <AppText
                size={20}
                text={doorState.status === 1 ? 'закрыта' : 'открыта'}
                color={
                  doorState.status === 1 ? '#19DA2C' : THEME.NO_ACTIVE_COLOR
                }
              />
            </View>
            <View style={status}>
              <AppText text={'Замок: '} size={20} />
              <AppText
                size={20}
                text={doorState.isLock === 1 ? 'вкл' : 'выкл'}
                color={
                  doorState.isLock === 1 ? '#19DA2C' : THEME.NO_ACTIVE_COLOR
                }
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Neomorph>
  );
};
export default DoorCard;
const styles = StyleSheet.create({
  card: {
    marginBottom: 25,
    marginTop: 25,
    height: 200,
    width: windowWidth * 0.8,
    shadowRadius: 7,
    alignSelf: 'center',
    backgroundColor: THEME.MAIN_COLOR,
    borderRadius: 25,
    alignItems: 'flex-start',
    marginRight: 'auto',
    marginLeft: 'auto',
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
