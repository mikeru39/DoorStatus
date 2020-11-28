// import React, {Component} from 'react';
// import {AppNavigation} from './src/navigation/AppNavigation';
// import {Provider} from 'react-redux';
// import store from './src/store/index';
// import TcpSocket from 'react-native-tcp-socket';
//
// class App extends Component {
//   sendWiFi = (ssid, pass) => {
//     const client = TcpSocket.createConnection(
//       {
//         port: 1234,
//         host: '192.168.4.1',
//         reuseAddress: true,
//         interface: 'wifi',
//         // tls: true,
//       },
//       (address) => {
//         console.log(ssid);
//         client.write(ssid);
//         // Close socket
//         client.destroy();
//       },
//     );
//
//     client.on('data', function (data) {
//       console.log('message was received', data);
//     });
//
//     client.on('error', function (error) {
//       console.log(error);
//     });
//
//     client.on('close', function () {
//       console.log('Connection closed!');
//     });
//   };
//   render() {
//     return (
//       // <View style={{flex: 1, justifyContent: 'center'}}>
//       //   <Button title={'client'} onPress={() => this.sendWiFi('tusya')} />
//       // </View>
//       //
//       <Provider store={store}>
//         <AppNavigation />
//       </Provider>
//     );
//   }
// }
//
// export default App;
import React, {useCallback, useMemo, useRef} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

const App = () => {
  // hooks
  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );
  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapTo(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  );
  return (
    <View style={styles.container}>
      <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} />
      <BottomSheet
        ref={sheetRef}
        initialSnapIndex={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}>
        <BottomSheetFlatList
          data={data}
          keyExtractor={(i) => i}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default App;
