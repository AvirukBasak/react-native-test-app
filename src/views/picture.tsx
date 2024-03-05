import React, {useState} from 'react';
import {View, Button, Image, Platform} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Linking} from 'react-native';

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
    });
  };

  const openGalleryApp = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('content://media/internal/images/media');
    } else {
      Linking.openURL('photos-redirect://');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {imageUris.map((uri, i) => (
        <Image
          key={i}
          source={{uri}}
          style={{width: 200, height: 200, margin: 5}}
        />
      ))}
      <Button title="Take Picture" onPress={takePicture} />
      <Button title="Select from Gallery" onPress={selectImageFromGallery} />
      <Button title="Open Gallery" onPress={openGalleryApp} />
    </View>
  );
};

export default PictureScreen;
