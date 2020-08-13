import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';


export default class Map extends React.Component {
  render() {
      return (
          <Text>I'm the Map.</Text>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
