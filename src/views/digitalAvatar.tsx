import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';

/*

Job:
- Display a floating avatar at the bottom right of the screen
- Tapping on it opens a chat view near the avatar

*/

function ChatView() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(
    [
      {text: 'Hello!', sent: false},
      {text: 'Hi there!', sent: true},
      {text: 'How are you?', sent: false},
      {text: 'I am good, thanks!', sent: true},
      {text: 'How can I help you?', sent: true},
      {text: 'I need help with my account.', sent: false},
      {text: 'Sure, I can help you with that.', sent: true},
      {text: 'Thank you!', sent: false},
      {text: 'You are welcome!', sent: true},
    ].reverse() as {text: string; sent: boolean}[],
  );

  // Function to handle sending a new message
  const sendMessage = () => {
    if (!inputText.trim()) {
      return;
    }
    setMessages(m => {
      const newM = [{text: inputText.trim(), sent: true}, ...m];
      // Simulate a response after 1 second
      setTimeout(() => receiveResponse(newM), 1000);
      setInputText('');
      return newM;
    });
  };

  // Function to handle receiving a simulated response
  const receiveResponse = (m: {text: string; sent: boolean}[]) => {
    setMessages([
      {text: 'I am a bot, I can help you with your account.', sent: false},
      ...m,
    ]);
  };

  // Render the chat UI
  return (
    <View style={chatviewStyles.container}>
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <View
            style={[
              chatviewStyles.message,
              item.sent ? chatviewStyles.sent : chatviewStyles.received,
            ]}>
            <Text style={chatviewStyles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <View style={chatviewStyles.inputContainer}>
        <TextInput
          style={chatviewStyles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          onSubmitEditing={sendMessage}
        />
        <Pressable style={chatviewStyles.sendButton} onPress={sendMessage}>
          <Text style={chatviewStyles.sendTxt}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const chatviewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    position: 'absolute',
    elevation: 5,
    bottom: 90,
    right: 10,
    width: 300,
    height: 500,
  },
  message: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  sent: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  received: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#26653A',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendTxt: {
    color: '#fff',
  },
});

export default function DigitalAvatar() {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <View style={avaterButtonStyles.container}>
      {chatVisible && <ChatView />}
      <Pressable
        style={avaterButtonStyles.fab}
        onPress={() => setChatVisible(!chatVisible)}>
        <Text style={avaterButtonStyles.fabTxt}>
          {chatVisible ? 'Hide Chat' : 'Show Chat'}
        </Text>
      </Pressable>
    </View>
  );
}

const avaterButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 40,
    right: 10,
    backgroundColor: '#26653A',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  fabTxt: {
    color: '#fff',
  },
});
