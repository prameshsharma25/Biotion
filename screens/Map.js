import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default class Map extends React.Component {
  render() {
      return (
        <View style={styles.container}>
          <MapView style={styles.mapStyle} region={{latitude: 39.1404477, longitude: -121.6169108, latitudeDelta: 0.09, longitudeDelta: 0.035}}>
            <Marker coordinate={{latitude: 39.111500, longitude: -121.655270}}/>
            <Marker coordinate={{latitude: 39.111500, longitude: -119}}/>
            <Marker coordinate={{latitude: 36, longitude: -111}}/>
            <Marker coordinate={{latitude: 32, longitude: -132}}/>
          </MapView>
        </View>

 
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
