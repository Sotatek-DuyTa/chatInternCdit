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

  makeid = (length = 10) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  createChannel = (listUser, name) => {
    let uid = this.getUserId();
    let randomName = this.makeid();

    this.firebase.database().ref(`channels/${randomName}`).set({
      name: name
    });

    this.firebase.database().ref(`users/${uid}/channels/${randomName}`).set({
      name: name
    })

    return this.firebase.database().ref(`channels/${randomName}/users`).set({
      ...listUser
    })
    // return new Promise(res => {setTimeout(res, 100)});
  }

  createUserProfile = (user) => {
    let uid = this.getUserId();
    this.firebase.database().ref(`user/${uid}`).set({
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

  updateUserAvatar = (url, uid) => {
    this.firebase.database().ref(`user/${uid}`).update({
      avatar: url
    })
  }
}
