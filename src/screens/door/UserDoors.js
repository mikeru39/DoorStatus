import React from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import DoorCard from '../../components/cards/DoorCard';
import {AppText, Loading} from '../../components/uikit';
import {useDispatch, useSelector} from 'react-redux';
import {getDoors, setDoorListener} from '../../store/actions/doors';
import HeaderButtons from '../../components/uikit/HeaderButtons';

const UserDoors = ({navigation}) => {
  const user_doors = useSelector((state) => state.doors.user_doors);
  const loading = useSelector((state) => state.doors.loadingUserDoors);
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons
          name={'settings'}
          side={'l'}
          onPress={() => navigation.navigate('add')}
        />
      ),
      headerRight: () => (
        <HeaderButtons
          name={'add-circle'}
          onPress={() => {
            dispatch(getDoors());
            navigation.navigate('add');
          }}
        />
      ),
    });
  }, [dispatch, navigation]);
  const onPress = (door) => {
    navigation.navigate('door', {
      door,
    });
  };
  const renderItem = ({item}) => {
    return (
      <DoorCard id={item.key} name={item.name} onPress={() => onPress(item)} />
    );
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <Loading size={'large'} />
      ) : (
        <FlatList
          data={user_doors}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      )}
      <StatusBar backgroundColor={'#1B1F26'} />
    </View>
  );
};

export default UserDoors;
