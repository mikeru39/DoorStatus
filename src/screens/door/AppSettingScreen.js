import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

class AppSettingScreen extends React.Component {
  static navigationOptions = {title: null};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return <View> </View>;
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AppSettingScreen);
