import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Easing,
  Animated,
  View,
} from 'react-native';
import {THEME} from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';

class ToggleStatusButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: props.init,
      onPress: props.onPress,
      pos: new Animated.Value(0),
      icon: 'lock-closed',
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
        icon: 'lock-closed',
      });
    } else {
      this.move1(69);
      this.setState({
        button: 0,
        icon: 'lock-open',
      });
    }
  };
  render() {
    return (
      <View style={styles.bg}>
        <View style={styles.trackGradient}>
          <View style={{position: 'absolute', marginTop: 15}}>
            <Icon name={'lock-closed'} color={'#FC0000'} size={30} />
          </View>
          <View style={{position: 'absolute', marginTop: 205}}>
            <Icon name={'lock-open'} color={'#32FA46'} size={30} />
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (this.state.button === 1) {
                // this.state.onPress(0);
                this.changeStatus(0);
              } else {
                // this.state.onPress(1);
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
              <View style={styles.thumb}>
                <Icon name={this.state.icon} color={'#303844'} size={35} />
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  trackGradient: {
    flex: 1,
    borderRadius: 82,
    borderWidth: 2,
    borderColor: THEME.ACTIVE_COLOR,
    alignItems: 'center',
  },
  thumb: {
    borderRadius: 82,
    backgroundColor: 'rgba(255, 211, 105, 0.8)',
    borderColor: THEME.ACTIVE_COLOR,
    height: 180,
    width: 157,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    borderRadius: 85,
    padding: 5,
    width: 170,
    marginBottom: 20,
    height: 263,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ToggleStatusButton;
