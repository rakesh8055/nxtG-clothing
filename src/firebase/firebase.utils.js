import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBplVQDeoFwCgPu8ECRJPmCFN-hO2-RJM0",
    authDomain: "genx-clothing.firebaseapp.com",
    databaseURL: "https://genx-clothing.firebaseio.com",
    projectId: "genx-clothing",
    storageBucket: "genx-clothing.appspot.com",
    messagingSenderId: "1091390175537",
    appId: "1:1091390175537:web:74414141778b7d4dbf1810",
    measurementId: "G-TJVHZRBN6X"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;