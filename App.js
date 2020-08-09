import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import {Permissions, Location} from 'expo';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';


import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';

import firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);


export default function App() {

  state = {
    status: null
  };

  permissionsFlow = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({status});

    if (status !== 'granted') {
      Linking.openURL('app-settings:');
      return;
    }

    const {data} = await Location.getCurrentPositionAsync(options);
    console.log(data);
  };

  return (
    <AppNavigator/>
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
