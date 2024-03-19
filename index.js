/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';

AppRegistry.registerComponent(appName, () => App);

// const firebaseConfig = {
//   apiKey: 'AIzaSyD-2Yj3dA5V8Z5z1cGk7G9J5tJ6yV3r8P8',
//   authDomain: 'chatapp-6c8e4.firebaseapp.com',
//   projectId: 'chatapp-6c8e4',
//   storageBucket: 'chatapp-6c8e4.appspot.com',
//   messagingSenderId: '1053338323443',
//   appId: '1:1053338323443:web:7b3c8a2c6e9e8b5c9f4b6e',
//   measurementId: 'G-0VH7VJ0L5V',
// };

// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// }

// // set up messaging
// const messaging = firebase.messaging();
