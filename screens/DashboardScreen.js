import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
import { firebaseConfig } from '../config';

class DashboardScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Maps</Text>
                <Button title="Sign Out" onPress = {() => firebase.auth.signOut()}/>
            </View>
        );
    }
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
