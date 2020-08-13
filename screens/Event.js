import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';


export default class Event extends React.Component {
  render() {
      return (
          <Text>Events</Text>
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
