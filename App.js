import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppNavigator from './navigation/AppNavigator';

export default class App extends Component {
  state = {
    isLoadingComplete: false,
  };
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
