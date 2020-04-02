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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log('userAuth', userAuth);
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();
    if(!snapshot.exists){
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating a user', error.message);
      }
    }

    console.log('snapshot', snapshot);
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;