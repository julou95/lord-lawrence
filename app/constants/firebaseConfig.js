import "firebase/firestore";
import "firebase/storage";
import firebase from 'firebase/app';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: "cozy-d5e47.firebaseapp.com",
  projectId: "cozy-d5e47",
  storageBucket: "cozy-d5e47.appspot.com",
  messagingSenderId: "250615503268",
  appId: "1:250615503268:web:f4ef5d727b0e8fbbb30931"
}

export const db = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  return firebase.firestore()
}

export const storage = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  return firebase.storage()
}