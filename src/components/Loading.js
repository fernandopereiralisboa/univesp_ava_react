import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

export default Loading;