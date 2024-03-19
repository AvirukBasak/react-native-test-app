import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import Tts from 'react-native-tts';

export default function FcmNotify() {
  async function requestPermissions() {
    try {
      // Request FCM permissions
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('FCM permissions granted');
      }
    } catch (error) {
      console.error('Error requesting FCM permissions', error);
    }
  }

  function registerBackgroundHandler() {
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

  function registerQuitStateHandler() {
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
  }

  useEffect(() => {
    requestPermissions().then(() => {
      registerBackgroundHandler();
      registerForegroundHandler();
      registerQuitStateHandler();
    });
  }, []);

  // Render your app content
  return <></>;
}
