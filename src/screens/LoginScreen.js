import React, { Component } from 'react';

import {
  View,
  Text,
  Button
} from 'react-native';

class LoginScreen extends Component {
  render() {
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
      </View>
    );
  }
}

export default LoginScreen;