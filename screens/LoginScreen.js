import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Button} from 'react-native';
import firebase from 'firebase';
import * as Google from "expo-google-app-auth";


export default class LoginScreen extends React.Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken,googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(result) {
          console.log("User signed in.");
          if(result.additionalUserInfo.isNewUser) {
            firebase.database().ref('users/' + result.user.uid).set({
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture,
              locale: result.additionalUserInfo.profile.locale,
              first_name: result.additionalUserInfo.profile.given_name,
              last_name: result.additionalUserInfo.profile.family_name,
              created_at: Date.now()
            }).then(function(snapshot){
          
            });
          } else {
              firebase.database().ref('users/' + result.user.uid).update({
                last_logged_in: Date.now()
              });
          }
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId: "218209238011-5ouove3qpb71a1g677il08qtmoohpufv.apps.googleusercontent.com",
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
    
  render() {
        return (
            <View style={styles.container}>
              <ImageBackground source={require('../forest.jpg')} style={styles.image} blurRadius={0.3}>
                <View>
                  <Text style={styles.text}>Biotion</Text>
                </View>
                  <View style={styles.button}>
                    <Button title='Sign In With Google' onPress={() => this.signInWithGoogleAsync()}/>
                  </View>
              </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },
  image: {
    width: '100%', 
    height: '100%'
  },
  text: {
    color: '#E6E6FA', 
    fontSize: 40, 
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: '55%',

  },
  button: {
    display: 'flex', 
    justifyContent: 'center',
    marginLeft: '25%',
    marginTop: '50%',
    width: 192, 
    height: 48
  }
});
