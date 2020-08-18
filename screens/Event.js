import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MailComposer from 'expo-mail-composer';

export default class Event extends React.Component {
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }

  render() {
      return (
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>

          <View style={{width: '100%', height: '70%', alignItems: 'center', justifyContent: 'space-around'}}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={()=>this.pickImage()}>
              <Ionicons name="ios-photos" style={{ color: "#fff", fontSize: 40, width: '100%'}}/>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '20%'}}>
            <View>
              <Button title="Cancel" color="red" style={{width:'40%'}} onPress=""/>
            </View>

            <View>
              <Button title="Get Current Location" color="blue" style={{width: '100%'}}/>
            </View>

            <View>
              <Button title="Post" color="green" style={{width:'40%'}} onPress=""/>
            </View>
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
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
});
