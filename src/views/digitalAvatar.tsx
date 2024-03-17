import React, {useState, useEffect} from 'react';
import {View, Image, TextInput, StyleSheet, Button} from 'react-native';
import Tts, {TtsEvent} from 'react-native-tts';

const AvatarImages = [
  require('../res/avatar/0.png'),
  require('../res/avatar/1.png'),
  require('../res/avatar/2.png'),
  require('../res/avatar/3.png'),
];

function TalkingAvatar({
  text,
  isSpeaking,
  setIsSpeaking,
}: {
  text: string;
  isSpeaking: boolean;
  setIsSpeaking: (speaking: boolean) => void;
}) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!isSpeaking || !text) {
      // if not speaking or no text, return
      return;
    }

    Tts.getInitStatus()
      .then(() =>
        Tts.speak(text, {
          androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
          },
          iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
          rate: 0.5,
        }),
      )
      .catch(console.error);
  }, [text, isSpeaking, setIsSpeaking]);

  useEffect(() => {
    const listeners = {
      addListeners: () => {
        Tts.addEventListener('tts-finish', ttsEvents.onDone);
        Tts.addEventListener('tts-cancel', ttsEvents.onStopped);
        Tts.addEventListener('tts-progress', ttsEvents.onProgress);
      },
      removeListeners: () => {
        Tts.removeEventListener('tts-start', ttsEvents.onStart);
        Tts.removeEventListener('tts-finish', ttsEvents.onDone);
        Tts.removeEventListener('tts-cancel', ttsEvents.onStopped);
        Tts.removeEventListener('tts-progress', ttsEvents.onProgress);
      },
    };

    const ttsEvents = {
      onStart: () => {
        setCurrentFrame(1);
        listeners.addListeners();
      },
      onDone: () => {
        setIsSpeaking(false);
        setCurrentFrame(0);
      },
      onStopped: () => {
        setIsSpeaking(false);
        setCurrentFrame(0);
      },
      onProgress: (_progress: TtsEvent<'tts-progress'>) => {
        let frameIndex = currentFrame;
        while (frameIndex === currentFrame) {
          const frames = [1, 2, 3];
          frameIndex = frames[Math.floor(Math.random() * frames.length)];
        }
        setCurrentFrame(frameIndex);
      },
    };

    Tts.addEventListener('tts-start', ttsEvents.onStart);
  }, [text, isSpeaking, setIsSpeaking, currentFrame]);

  return <Image source={AvatarImages[currentFrame % 4]} />;
}

export default function DigitalAvatar() {
  const [text, setText] = useState(
    'This method creates a new array containing all of the elements of the original array that pass a test function. You can use this method to create a new array containing only the elements of the original array that are equal to a random number.',
  );
  const [isSpeaking, setIsStarted] = useState(false);

  return (
    <View style={styles.container}>
      {isSpeaking ? (
        <TalkingAvatar
          text={text}
          isSpeaking={isSpeaking}
          setIsSpeaking={setIsStarted}
        />
      ) : (
        <Image source={AvatarImages[0]} />
      )}

      <TextInput
        placeholder="Type something"
        value={text}
        onChangeText={setText}
      />

      <Button
        title={isSpeaking ? 'Stop' : 'Start'}
        onPress={() => setIsStarted(!isSpeaking)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
