import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import { firebaseConfig } from '../config';

class DashboardScreen extends React.Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
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

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
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
              <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", margin: 20}}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', alignItems: 'center', backgroundColor: 'transparent', }} onPress={()=>this.pickImage()}>
                  <Ionicons name="ios-photos" style={{ color: "#fff", fontSize: 40}}/>
                </TouchableOpacity>
               
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

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
