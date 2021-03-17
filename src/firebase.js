import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDxepQ6ndBbW07v3LFXEfSzbYMhFHjFU9E",
    authDomain: "bacefookkk.firebaseapp.com",
    projectId: "bacefookkk",
    storageBucket: "bacefookkk.appspot.com",
    messagingSenderId: "85667443287",
    appId: "1:85667443287:web:a5fc898d95949916492912"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider()
const timeStamp = firebase.firestore.FieldValue.serverTimestamp()

export {db,auth,storage,provider,timeStamp}