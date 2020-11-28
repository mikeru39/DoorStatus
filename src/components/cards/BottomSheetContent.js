import React from 'react';
import {FlatList, View, ScrollView} from 'react-native';
import {THEME} from '../../theme';
import {AppText} from '../uikit';
import LogCard from './LogCard';
import {winW, winH} from '../../constants';
class BottomSheetContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {log: props.log};
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.log !== this.state.log && nextProps.log !== null) {
      this.setState({log: nextProps.log});
      console.log(nextProps.log);
      return true;
    }
    return false;
  }

  render() {
    return (
      <View
        style={{
          marginTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 20,
          marginRight: 'auto',
          marginLeft: 'auto',
          width: winW * 0.8,
          height: winH * 0.5,
          backgroundColor: THEME.MAIN_COLOR,
        }}>
        <View
          style={{
            paddingTop: 10,
            paddingLeft: 20,
            height: 80,
          }}>
          <AppText text={'Активность'} size={20} />
        </View>
        <FlatList
          data={this.state.log}
          renderItem={(item) => (
            <LogCard
              status={item.item.status}
              device={item.item.device}
              time={item.item.log}
            />
          )}
          keyExtractor={(item) => item.log}
        />
      </View>
    );
  }
}

export default BottomSheetContent;
