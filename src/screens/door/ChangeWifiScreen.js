import React from 'react';

import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  Animated,
  PermissionsAndroid,
  RefreshControl,
} from 'react-native';
import {AppButton, AppText, AppTextInput} from '../../components/uikit';
import {THEME} from '../../theme';
import WifiManager from 'react-native-wifi-reborn';
import {unique} from '../../constants';
class ChangeWifiScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: '',
      opacity: new Animated.Value(1),
      action: true,
      loadWifi: false,
      pass: '',
      wifi: null,
    };
  }

  loadWifi = async () => {
    this.setState({loadWifi: true});
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const response = await WifiManager.reScanAndLoadWifiList();
      let wifi = [];
      for (let i in response) {
        wifi.push(response[i].SSID);
      }
      this.setState({wifi: unique(wifi), loadWifi: false});
    } else {
      this.props.navigation.goBack();
    }
  };
  connectToWifi = async () => {
    // WifiManager.connectToProtectedSSID(
    //   this.state.ssid,
    //   this.state.password,
    //   true,
    // ).then(
    //   () => {
    //     console.log('Connected successfully!');
    //   },
    //   () => {
    //     console.log('Connection failed!');
    //   },
    // );
  };

  componentDidMount() {
    WifiManager.setEnabled(true);
    this.loadWifi();
  }
  onPress = (to, ssid = '') => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start(() => {
      this.setState({action: !to, ssid: ssid, pass: ''});
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 50,
        useNativeDriver: false,
      }).start();
    });
  };
  render() {
    const renderItem = ({item}) => (
      <TouchableWithoutFeedback onPress={() => this.onPress(true, item)}>
        <View
          style={{
            height: 60,
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 16,
            borderRadius: 15,
            backgroundColor: '#1B1F26',
            justifyContent: 'center',
          }}>
          <AppText text={item} size={20} />
        </View>
      </TouchableWithoutFeedback>
    );
    console.log(this.state.opacity);
    return (
      <Animated.View style={{flex: 1, opacity: this.state.opacity}}>
        {this.state.action ? (
          <>
            <View style={{flex: 10}}>
              <FlatList
                data={this.state.wifi}
                keyExtractor={(item) => {
                  console.log(item);
                  return item;
                }}
                refreshControl={
                  <RefreshControl
                    onRefresh={this.loadWifi}
                    refreshing={this.state.loadWifi}
                    tintColor="#000"
                    progressBackgroundColor={THEME.ACTIVE_COLOR}
                  />
                }
                renderItem={renderItem}
              />
            </View>
            <View style={{flex: 1, padding: 10}}>
              <AppButton
                text={'Далее'}
                style={{borderRadius: 20}}
                onPress={() => console.log('continue')}
              />
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{height: '50%', width: '80%', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      marginTop: 'auto',
                      marginBottom: 20,
                    }}>
                    <AppText text={this.state.ssid} size={25} />
                  </View>
                  <AppTextInput
                    type={'pass'}
                    iconName={'keypad'}
                    placeHolder={'Password'}
                    onChange={(text) => this.setState({pass: text})}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: 20,
                    flexDirection: 'row',
                  }}>
                  <AppButton
                    text={'Отмена'}
                    style={{
                      backgroundColor: '#9CA0A3',
                      marginRight: 10,
                      padding: 20,
                    }}
                    onPress={() => this.onPress(false)}
                  />
                  <AppButton
                    text={'Ок'}
                    style={{padding: 20}}
                    onPress={this.connectToWifi}
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </Animated.View>
    );
  }
}

export default ChangeWifiScreen;
