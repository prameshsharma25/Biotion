import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';


class LoginScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button 
                  title="Sign In With Google"
                  onPress={() => alert('button pressed')}
                />
            </View>
        );
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
