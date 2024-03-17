import React, {useState, useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import Tts, {TtsEvent} from 'react-native-tts';

/**
 *
 */
const AvatarImages = [
  require('../res/avatar/0.png'),
  require('../res/avatar/1.png'),
  require('../res/avatar/2.png'),
  require('../res/avatar/3.png'),
];

export default function TalkingAvatar({text}: {text: string}) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    function startSpeaking() {
      setSpeaking(true);
      Tts.speak(text, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
        iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
        rate: 0.5,
      });

      const ttsEvents = {
        onStart: () => {
          setCurrentFrame(1);
        },
        onDone: () => {
          setSpeaking(false);
          setCurrentFrame(0);
        },
        onStopped: () => {
          setSpeaking(false);
          setCurrentFrame(0);
        },
        onProgress: (progress: TtsEvent<'tts-progress'>) => {
          const syllableIndex = Math.floor(progress.location / 0.2);
          const frameIndex = (syllableIndex % 3) + 1;
          setCurrentFrame(frameIndex);
        },
      };

      Tts.addEventListener('tts-start', ttsEvents.onStart);
      Tts.addEventListener('tts-finish', ttsEvents.onDone);
      Tts.addEventListener('tts-cancel', ttsEvents.onStopped);
      Tts.addEventListener('tts-progress', ttsEvents.onProgress);
    }

    if (text && !speaking) {
      startSpeaking();
    }
  }, [text, speaking]);

  return (
    <View>
      <Image source={AvatarImages[currentFrame]} />
      {text && <Text>{text}</Text>}
    </View>
  );
}
