import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Picture from './Picture';
import Map from './Map';
import Event from './Event';

const Tabs = createBottomTabNavigator();
const CameraStack = createStackNavigator();
const MapStack = createStackNavigator();
const EventStack = createStackNavigator();

const CameraStackScreen = () => (
  <CameraStack.Navigator>
    <CameraStack.Screen name='Camera' component={Picture}/>
  </CameraStack.Navigator>
);

const MapStackScreen = () => (
  <MapStack.Navigator>
    <MapStack.Screen name='Map' component={Map}/>
  </MapStack.Navigator>
);

const EventStackScreen = () => (
  <EventStack.Navigator>
    <EventStack.Screen name='Events' component={Event}/>
  </EventStack.Navigator>
);

export default class DashboardScreen extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen name='Events' component={EventStackScreen} />
          <Tabs.Screen name='Camera' component={CameraStackScreen} />
          <Tabs.Screen name='Map' component={MapStackScreen}/>
        </Tabs.Navigator>
      </NavigationContainer>
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
