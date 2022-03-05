import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBwu0EMwQd0MD1sdUXhtc7THdKfn83crc4',
  authDomain: 'blueprint-factory-mvp.firebaseapp.com',
  projectId: 'blueprint-factory-mvp',
  storageBucket: 'blueprint-factory-mvp.appspot.com',
  messagingSenderId: '284503205805',
  appId: '1:284503205805:web:a070cbb5cd17a79c2e2324',
  measurementId: 'G-WG5FLVQEJS',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const firebaseInstance = firebase;

export const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : null;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
