import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppText, Loading} from '../../components/uikit';
import ToggleStatusButton from '../../components/uikit/ToggleStatusButton';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import {winH} from '../../constants';
import {changeDoorStatus} from '../../store/actions/doors';
import {LogCard} from '../../components/cards';

const DoorScreen = ({navigation, route}) => {
  const [door, setDoor] = useState(undefined);
  const {name, key} = route.params.door;
  const dispatch = useDispatch();
  const stateDoor = useSelector((state) => state.doors.doors).find(
    (item) => item.key === key,
  );
  useEffect(() => {
    if (stateDoor !== door) {
      setDoor(stateDoor);
    }
  }, [stateDoor, door]);
  const onPress = async (state) => {
    dispatch(changeDoorStatus(state, key));
  };
  const {container, status} = styles;
  return (
    <View style={{flex: 1}}>
      {door !== undefined ? (
        <View style={container}>
          <View style={status}>
            <ToggleStatusButton init={door.isLock} onPress={onPress} />
            <AppText text={'Дверь закрыта'} />
          </View>
          <ScrollBottomSheet
            initialSnapIndex={2}
            componentType="FlatList"
            renderHandle={() => (
              <View style={styles.header}>
                <View style={styles.panelHandle} />
              </View>
            )}
            keyExtractor={(i) => i}
            snapPoints={[80, winH * 0.5 + 10]}
            data={stateDoor.log}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({item}) => <LogCard time={item.log} />}
          />

          <StatusBar backgroundColor={'#1B1F26'} />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loading size={'large'} />
        </View>
      )}
    </View>
  );
};

export default DoorScreen;
const styles = StyleSheet.create({
  status: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignSelf: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: '#F3F4F9',
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
  },
  container: {
    flex: 1,
  },
});
