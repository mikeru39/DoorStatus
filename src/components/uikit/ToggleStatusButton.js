import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Easing,
  Animated,
  View,
} from 'react-native';
import {THEME} from '../../theme';
import {Neomorph} from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ToggleStatusButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: props.init,
      onPress: props.onPress,
      pos: new Animated.Value(0),
      keyColor: '#FC0000',
      icon: 'lock-outline',
    };
  }
  componentDidMount() {
    this.changeStatus(this.state.button);
  }

  move1 = (y) => {
    Animated.timing(this.state.pos, {
      toValue: y,
      duration: 80,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  changeStatus = (state) => {
    if (state === 1) {
      this.move1(0);
      this.setState({
        button: 1,
        keyColor: '#FC0000',
        icon: 'lock-outline',
      });
    } else {
      this.move1(69);
      this.setState({
        button: 0,
        keyColor: '#32FA46',
        icon: 'lock-open-outline',
      });
    }
  };
  render() {
    return (
      <Neomorph style={styles.bg}>
        <LinearGradient
          start={{x: 0.4, y: 0.2}}
          end={{x: 0.6, y: 0.8}}
          colors={['#FC0000', '#32FA46']}
          style={styles.trackGradient}>
          <View style={{position: 'absolute', marginTop: 15}}>
            <Icon name={'lock-outline'} size={30} />
          </View>
          <View style={{position: 'absolute', marginTop: 205}}>
            <Icon name={'lock-open-outline'} size={30} />
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (this.state.button === 1) {
                this.state.onPress(0);
                this.changeStatus(0);
              } else {
                this.state.onPress(1);
                this.changeStatus(1);
              }
            }}>
            <Animated.View
              style={{
                width: 157,
                height: 180,
                borderRadius: 82,
                transform: [{translateY: this.state.pos}],
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#D7E5EF', '#B5C1C9']}
                style={styles.thumbGradient}>
                <Neomorph style={styles.thumbContent}>
                  <Icon
                    name={this.state.icon}
                    color={this.state.keyColor}
                    size={35}
                  />
                </Neomorph>
              </LinearGradient>
            </Animated.View>
          </TouchableWithoutFeedback>
        </LinearGradient>
      </Neomorph>
    );
  }
}

const styles = StyleSheet.create({
  trackGradient: {
    flex: 1,
    borderRadius: 82,
    borderWidth: 2,
    borderColor: '#111111',
    alignItems: 'center',
  },
  thumbContent: {
    height: 65,
    width: 65,
    borderRadius: 35,
    shadowRadius: 10,
    backgroundColor: THEME.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbGradient: {
    borderRadius: 82,
    backgroundColor: THEME.MAIN_COLOR,
    height: 180,
    width: 157,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    shadowRadius: 10,
    borderRadius: 85,
    backgroundColor: THEME.MAIN_COLOR,
    padding: 5,
    width: 170,
    marginBottom: 20,
    height: 263,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ToggleStatusButton;
