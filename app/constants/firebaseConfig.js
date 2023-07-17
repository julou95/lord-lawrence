import "firebase/firestore";
import "firebase/storage";
import firebase from 'firebase/app';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID
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
