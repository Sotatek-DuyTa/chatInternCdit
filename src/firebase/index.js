import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

export default () => {
    firebase.initializeApp(firebaseConfig);
}