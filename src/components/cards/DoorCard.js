import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {AppText, Loading} from '../uikit';
import {THEME} from '../../theme';
import {winW} from '../../constants';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {setDoorListener} from '../../store/actions/doors';

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
    if (props.door !== state.door) {
      return {
        door: props.door,
      };
    }
    return null;
  }

  componentWillUnmount() {
    database().ref(`doors/${this.state.key}`).off('value');
  }
  onPress = async () => {
    if (this.state.door !== undefined) {
      this.props.onPress({key: this.state.key, name: this.state.name});
    }
  };
  render() {
    const {wrap, card, title, status, statuses} = styles;
    const door = this.state.door;
    return (
      <TouchableWithoutFeedback onPress={() => this.onPress()}>
        <View style={card}>
          {door !== undefined ? (
            <>
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
            </>
          ) : (
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Loading size={'large'} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  door: state.doors.doors.find((item) => item.key === ownProps.id),
});
const mapDispatchToProps = {
  setDoorListener,
};
export default connect(mapStateToProps, mapDispatchToProps)(DoorCard);

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginBottom: 25,
    marginTop: 25,
    height: 200,
    width: winW * 0.8,
    alignSelf: 'center',
    backgroundColor: 'rgba(27, 31, 38, 0.7)',
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
