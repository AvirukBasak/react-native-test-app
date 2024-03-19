import React, {useEffect} from 'react';
import {Alert, Button, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Tts from 'react-native-tts';

function ttsSpeak(title?: string, body?: string) {
  if (!title || !body) {
    return;
  }
  const text = `${title}, ${body}`;
  Tts.setDucking(true);
  Tts.getInitStatus()
    .then(() =>
      Tts.speak(text, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 5,
          KEY_PARAM_STREAM: 'STREAM_NOTIFICATION',
        },
        iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
        rate: 0.5,
      }),
    )
    .catch(console.error);
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Get the notification data
  const {notification} = remoteMessage;
  const {title, body} = notification || {title: '', body: ''};

  // Play the notification content using TTS
  console.log('BackgroundMessageHandler', title);
  ttsSpeak(title, body);
});

// messaging()
//   .getInitialNotification()
//   .then(remoteMessage => {
//     if (remoteMessage) {
//       // Get the notification data
//       const {notification} = remoteMessage;
//       const {title, body} = notification || {title: '', body: ''};

//       // Play the notification content using TTS
//       console.log('GetInitialNotification', title);
//       ttsSpeak(title, body);
//     }
//   });

// messaging().onNotificationOpenedApp(remoteMessage => {
//   // Get the notification data
//   const {notification} = remoteMessage;
//   const {title, body} = notification || {title: '', body: ''};

//   // Play the notification content using TTS
//   console.log('OnNotificationOpenedApp', title);
//   ttsSpeak(title, body);
// });

messaging().onMessage(async remoteMessage => {
  // Get the notification data
  const {notification} = remoteMessage;
  const {title, body} = notification || {title: '', body: ''};

  // Play the notification content using TTS
  console.log('OnMessage', title);
  ttsSpeak(title, body);
  if (title && body) {
    Alert.alert(title, body);
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

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && Platform.Version >= 30) {
        await requestPermissionsAndroid();
      } else if (Platform.OS === 'ios') {
        await requestPermissionsIOS();
      }
    })();
  }, []);

  // Render your app content
  return (
    <Button
      title="FCM Token"
      onPress={() => {
        messaging()
          .getToken()
          .then(token => {
            Alert.alert('FCM Token', token);
            console.log('FCM Token:', token);
          })
          .catch(console.error);
      }}
    />
  );
}
