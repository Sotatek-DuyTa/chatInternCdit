import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

export default class BeeFirebase {
  firebase = {};

  getFirebase = () => this.firebase;

  initApp = () => {
    this.firebase = firebase.initializeApp(firebaseConfig);
  }

  getUserId = () => this.firebase.auth().currentUser.uid;

  getUserData = () => {
    let uid = this.getUserId();
    return this.firebase.database().ref('/user/' + uid).once('value')
      .then(data => ({ ...data.val(), ...{ uid } }))
  };

  getAllUser = () => this.firebase.database().ref('user').once('value');

  getAllMessage = (uid) => this.firebase.database().ref(`message/${uid}`).once('value'); 

  createUserProfile = (user) => {
    this.firebase.database().ref(`user/${user.uid}`).set({
      name: user.name,
      displayName: user.displayName,
      email: user.email,
      dOB: user.dOB,
      avatar: user.avatar,
      gender: user.gender
    })
  }

  getUserProfile = (uid) => this.firebase.database().ref(`user/${uid}`).once('value');

  pushAvatar = (file, name) => {
    this.firebase.storage().ref(`avatars/${name}`).put(file);
  }

  updateUserAvatar = (url,uid) => {
    this.firebase.database().ref(`user/${uid}`).update({
      avatar: url
    })
  }
}
