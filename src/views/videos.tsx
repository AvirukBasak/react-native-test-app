/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {View, Button, Platform, Linking} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Video from 'react-native-video';

export default function VideoScreen() {
  const [mediaUris, setMediaUris] = useState([] as string[]);

  const selectImageFromGallery = () => {
    launchImageLibrary({mediaType: 'video'}, response => {
      if (!response.didCancel) {
        setMediaUris(
          response.assets?.map(asset => asset.uri || '').filter(k => k) || [],
        );
      }
    });
  };

  const takePicture = () => {
    launchCamera({mediaType: 'video'}, response => {
      if (!response.didCancel) {
        setMediaUris(
          response.assets?.map(asset => asset.uri || '').filter(k => k) || [],
        );
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  const openGalleryApp = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('content://media/internal/images/media');
    } else {
      Linking.openURL('photos-redirect://');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}>
      {mediaUris.map((uri, i) => (
        <Video
          key={i}
          source={{uri}}
          style={{width: '90%', height: 400}}
          controls={true}
          resizeMode="contain"
        />
      ))}
      <View style={{flexDirection: 'column', gap: 10}}>
        <Button title="Record Video" onPress={takePicture} />
        <Button title="Select Video" onPress={selectImageFromGallery} />
        <Button title="Open Gallery" onPress={openGalleryApp} />
      </View>
    </View>
  );
}
