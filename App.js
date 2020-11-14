import React from 'react';
import {AppNavigation} from './src/navigation/AppNavigation';
import {Provider} from 'react-redux';
import store from './src/store/index';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
    // <View
    //   style={{
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: THEME.MAIN_COLOR,
    //   }}>
    //   <ToggleStatusButton onPress={() => console.log('press')} status={true} />
    // </View>
  );
};

export default App;
