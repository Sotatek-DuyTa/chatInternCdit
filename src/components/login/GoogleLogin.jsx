import React, { Component } from 'react';
import * as firebase from 'firebase';
import GoogleLogo from '../../../assets/images/google-logo.svg';

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user.email);
      } else {
        console.log('no user');
        // No user is signed in.
      }
    });
  }

  handleClick = () => {

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    // firebase.auth().languageCode = 'vn';
    firebase.auth().useDeviceLanguage();

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      console.log(user);
      console.log(token);

      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...

      console.log(error);
    });
  }

  createMockData = () => {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`user/${userId}`).set({
      username: 'bee',
      email: 'bee@gmail.com',
    })
  }
  
  changeMockData = () => {
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref(`user/Mixk9QRQK5QyfV4ndvNFvGRNSuH3`).update({
        name: 'duy ta 3',
        email: 'duyta291297@gmail.com'
      })
  }

  getInfor = () => {
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     console.log(user);
    //   } else {
    //     console.log('no user');
    //     // No user is signed in.
    //   }
    // });
    var userId = firebase.auth().currentUser.uid;
    console.log(userId);
    return firebase.database().ref(`/user/${userId}`).once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      console.log(snapshot.val());
      return username;
    });
  }

  render() {
    return (
      <>
        <button onClick={this.handleClick} className="social-login-item">
          <img src={GoogleLogo} alt="google"/>
        </button>
      </>
    );
  }
}

export default GoogleLogin;