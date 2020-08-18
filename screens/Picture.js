import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Picture extends React.Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    location: null,
    geocode: null,
    errorMessage: ""
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    const { latitude , longitude } = location.coords
    this.getGeocodeAsync({latitude, longitude})
    this.setState({ location: {latitude, longitude}});

  };

  getGeocodeAsync= async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location)
    this.setState({ geocode})
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  handleCameraType = () => {
    const { cameraType } = this.state
    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  }

  render () {
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    } else {
        return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => {this.camera = ref}}>
              <View style={{flex:1, flexDirection:"row", justifyContent:"space-around", margin: 20}}>
               
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', alignItems: 'center', backgroundColor: 'transparent'}} onPress={() => this.snap()}>
                  <FontAwesome name="camera" style={{ color: "#fff", fontSize: 40}}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={{alignSelf: 'flex-end', alignItems: 'center', backgroundColor: 'transparent'}} onPress={()=>this.handleCameraType()}>
                  <MaterialCommunityIcons name="camera-switch" style={{ color: "#fff", fontSize: 40}}/>
                </TouchableOpacity>
              </View>  
            </Camera>
          </View>
        );
     }
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
