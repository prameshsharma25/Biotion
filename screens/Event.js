import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default class Event extends React.Component {
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }

  render() {
      return (
        <View>
            <View>
              <Text>Add a trash site to the map.</Text>
            </View>

            <View>
              <Button title="Get Current Location" color="blue"/>
            </View>

            <TouchableOpacity
              style={{alignSelf: 'flex-end', alignItems: 'center', backgroundColor: 'transparent', }} onPress={()=>this.pickImage()}>
              <Ionicons name="ios-photos" style={{ color: "#fff", fontSize: 40}}/>
            </TouchableOpacity>

            <View>
              <Button title="Cancel" color="red" onPress=""/>
            </View>

            <View>
              <Button title="Post" color="green" onPress=""/>
            </View>
          </View>
      );
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
