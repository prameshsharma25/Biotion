import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';


class LoadingScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        );
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
