import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {AppText} from '../uikit';
import {THEME} from '../../theme';
import {Neomorph} from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import {getDoors, setDoorListener} from '../../store/actions/doors';
import {winW} from '../../constants';
import {connect} from 'react-redux';

class DoorCard extends Component {
  constructor(props) {
    super(props);
    props.setDoorListener(props.id);
    this.state = {
      door: undefined,
      name: props.name,
      key: props.id,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const door = props.doors.find((item) => item.key === state.key);
    if (door !== state.door) {
      return {
        door: door,
      };
    }
    return null;
  }
  render() {
    const {wrap, card, title, status, statuses} = styles;
    const door = this.state.door;
    return (
      <Neomorph style={card}>
        {!this.props.loading && door !== undefined ? (
          <TouchableWithoutFeedback
            onPress={() => this.props.onPress(this.state.key)}>
            <LinearGradient
              start={{x: 0.0, y: 0.0}}
              end={{x: 1, y: 1}}
              colors={[THEME.MAIN_COLOR, THEME.DOP_MAIN_COLOR]}
              style={styles.gradient}>
              <View style={title}>
                <AppText text={this.state.name} size={24} />
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
  }
}

const mapStateToProps = (state) => {
  return {
    doors: state.doors.doors,
    loading: state.doors.loadingDoor,
  };
};
const mapDispatchToProps = {
  setDoorListener,
};
export default connect(mapStateToProps, mapDispatchToProps)(DoorCard);

const styles = StyleSheet.create({
  gradient: {borderRadius: 25, width: winW * 0.8, height: '100%', padding: 20},
  card: {
    marginBottom: 25,
    marginTop: 25,
    height: 200,
    width: winW * 0.8,
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
