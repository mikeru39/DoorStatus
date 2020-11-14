import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {AppText} from './uikit';
import {THEME} from '../theme';
import {Neomorph} from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {setDoorListener} from '../store/actions/doors';
const windowWidth = Dimensions.get('window').width;

const DoorCard = ({id, name, onPress}) => {
  const {wrap, card, title, status, statuses} = styles;
  const [door, setDoor] = useState({});
  const state = useSelector((store) => store.doors.doors);
  const loading = useSelector((store) => store.doors.loadingD);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading) {
      setDoor(state.find((item) => item.key === id));
    } else {
      dispatch(setDoorListener(id));
    }
  }, [state, id, loading, dispatch]);
  return (
    <Neomorph style={card}>
      {!loading ? (
        <TouchableWithoutFeedback onPress={() => onPress(id)}>
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 1, y: 1}}
            colors={[THEME.MAIN_COLOR, THEME.DOP_MAIN_COLOR]}
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
                    text={door.status === 1 ? 'закрыта' : 'открыта'}
                    color={
                      door.status === 1 ? '#19DA2C' : THEME.NO_ACTIVE_COLOR
                    }
                  />
                </View>
                <View style={status}>
                  <AppText text={'Замок: '} size={20} />
                  <AppText
                    size={20}
                    text={door.isLock === 1 ? 'вкл' : 'выкл'}
                    color={
                      door.isLock === 1 ? '#19DA2C' : THEME.NO_ACTIVE_COLOR
                    }
                  />
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      ) : (
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText text={'loading'} size={20} />
        </View>
      )}
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
