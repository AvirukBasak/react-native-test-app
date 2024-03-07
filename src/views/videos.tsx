/* eslint-disable react-native/no-inline-styles */

import React, {useState, useRef} from 'react';
import {View, Text, Button} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Video from 'react-native-video';

export default function VideoScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const [videoUri, setVideoUri] = useState('');

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        const {uri} = await (cameraRef.current as any).recordAsync();
        setVideoUri(uri);
        setIsRecording(true);
      } catch (error) {
        console.error('Failed to start recording:', error);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      try {
        await (cameraRef.current as any).stopRecording();
        setIsRecording(false);
      } catch (error) {
        console.error('Failed to stop recording:', error);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={true}
      />

      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        {isRecording ? (
          <Button title="Stop Recording" onPress={stopRecording} />
        ) : (
          <Button title="Start Recording" onPress={startRecording} />
        )}
      </View>

      {videoUri ? (
        <View style={{flex: 0, alignItems: 'center'}}>
          <Text style={{marginTop: 20}}>Recorded Video:</Text>
          <Video
            source={{uri: videoUri}}
            style={{width: 300, height: 300, marginTop: 10}}
            controls={true}
            resizeMode="contain"
          />
        </View>
      ) : null}
    </View>
  );
}
