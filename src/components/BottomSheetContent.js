import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {THEME} from '../theme';
import {AppText} from './uikit';
import LogCard from './LogCard';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class BottomSheetContent extends React.Component {
  static navigationOptions = {title: null};

  constructor(props) {
    super(props);
    this.state = {log: props.log};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.log !== this.state.log && this.props.log !== null) {
      this.setState({log: this.props.log});
    }
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
          width: windowWidth * 0.8,
          height: windowHeight * 0.5,
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
