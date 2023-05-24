import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Scanner from './src/components/BarCodeScanner';

export default function App() {
  return (
    <View style={styles.container}>
      <Scanner/>
      {/* <Text>Hello </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
