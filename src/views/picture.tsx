/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {View, Button, Image, Platform, Linking} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const PictureScreen = () => {
  const [imageUris, setImageUris] = useState([] as string[]);

  const selectImageFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setImageUris(
          response.assets?.map(asset => asset.uri || '').filter(k => k) || [],
        );
      }
    });
  };

  const takePicture = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setImageUris(
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
      {imageUris.map((uri, i) => (
        <Image key={i} source={{uri}} style={{width: 200, height: 200}} />
      ))}
      <View style={{flexDirection: 'column', gap: 10}}>
        <Button title="Select Image" onPress={selectImageFromGallery} />
        <Button title="Take Picture" onPress={takePicture} />
        <Button title="Open Gallery" onPress={openGalleryApp} />
      </View>
    </View>
  );
};

export default PictureScreen;
