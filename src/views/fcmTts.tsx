import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Tts from 'react-native-tts';

function ttsSpeak(title?: string, body?: string) {
  const text = `${title}, ${body}`;
  Tts.getInitStatus()
    .then(() =>
      Tts.speak(text, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_NOTIFICATION',
        },
        iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
        rate: 0.5,
      }),
    )
    .catch(console.error);
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Message received!', remoteMessage);

  // Get the notification data
  const {notification} = remoteMessage;
  const {title, body} = notification || {title: '', body: ''};

  // Play the notification content using TTS
  ttsSpeak(title, body);
});

messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state',
        remoteMessage,
      );

      // Get the notification data
      const {notification} = remoteMessage;
      const {title, body} = notification || {title: '', body: ''};

      // Play the notification content using TTS
      ttsSpeak(title, body);
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
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background',
        remoteMessage,
      );

      // Get the notification data
      const {notification} = remoteMessage;
      const {title, body} = notification || {title: '', body: ''};

      // Play the notification content using TTS
      ttsSpeak(title, body);
    });
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && Platform.Version >= 30) {
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
