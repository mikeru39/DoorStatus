import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {AppText, AppBar} from '../../components/uikit';
import {THEME} from '../../theme';
import ToggleStatusButton from '../../components/buttons/ToggleStatusButton';
import BottomSheet from 'reanimated-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {changeDoorStatus} from '../../store/actions/doors';
import BottomSheetContent from '../../components/cards/BottomSheetContent';
import {winH} from '../../constants';
const DoorScreen = ({navigation, route}) => {
  const {key, name} = route.params?.door;
  const dispatch = useDispatch();
  const sheetRef = React.useRef(null);
  const door = useSelector((state) => state.doors.doors).find(
    (store) => store.key === key,
  );
  const onPress = async (state) => {
    dispatch(changeDoorStatus(state, key));
  };
  const renderContent = () => <BottomSheetContent log={door.log} />;
  const {container, title, inputE, inputP, bottomBtn} = styles;
  return (
    <View style={container}>
      <AppBar
        text={name}
        rightBtnName={'settings-outline'}
        leftBtnName={'arrow-back'}
        leftBtnOnPress={() => navigation.goBack()}
      />
      <View
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <ToggleStatusButton
          init={door.isLock}
          onPress={(state) => onPress(state)}
        />
        <AppText text={'Дверь закрыта'} />
      </View>
      <BottomSheet
        enabledInnerScrolling={true}
        // enabledContentGestureInteraction={false}
        ref={sheetRef}
        snapPoints={[80, winH * 0.5 + 10]}
        renderContent={renderContent}
      />
      <StatusBar backgroundColor={THEME.MAIN_COLOR} />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 'auto',
  },

  inputE: {marginBottom: 30},
  inputP: {marginBottom: 70},
  bottomBtn: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
    marginBottom: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
  },
});
export default DoorScreen;
