import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Tts from 'react-native-tts';

messaging().setBackgroundMessageHandler(
  async (remoteMessage: {notification: any}) => {
    console.log('Background Message received!', remoteMessage);

    // Get the notification data
    const {notification} = remoteMessage;
    const {title, body} = notification;

    // Play the notification content using TTS
    Tts.speak(`${title}, ${body}`);
  },
);

messaging()
  .getInitialNotification()
  .then((remoteMessage: {notification: any}) => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state',
        remoteMessage,
      );

      // Get the notification data
      const {notification} = remoteMessage;
      const {title, body} = notification;

      // Play the notification content using TTS
      Tts.speak(`${title}, ${body}`);
    }
  });

export default function FcmNotify() {
  async function requestPermissionsAndroid() {
    const stat = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (stat === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    console.error('Notification permission', stat);
    return false;
  }

  async function requestPermissionsIOS() {
    try {
      // Request FCM permissions
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        return true;
      } else {
        console.error('FCM permissions not granted');
      }
    } catch (error) {
      console.error('Error requesting FCM permissions', error);
    }
    return false;
  }

  function registerForegroundHandler() {
    messaging().onNotificationOpenedApp(
      (remoteMessage: {notification: any}) => {
        console.log(
          'Notification caused app to open from background',
          remoteMessage,
        );

        // Get the notification data
        const {notification} = remoteMessage;
        const {title, body} = notification;

        // Play the notification content using TTS
        Tts.speak(`${title}, ${body}`);
      },
    );
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        if (await requestPermissionsAndroid()) {
          registerForegroundHandler();
        }
      } else {
        if (await requestPermissionsIOS()) {
          registerForegroundHandler();
        }
      }
    })();
  }, []);

  // Render your app content
  return <></>;
}
