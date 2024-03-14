import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, FlatList} from 'react-native';

/*

Job:
- Display a floating avatar at the bottom right of the screen
- Tapping on it opens a chat view near the avatar

*/

function ChatView() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(
    [] as {text: string; sent: boolean}[],
  );

  // Function to handle sending a new message
  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, {text: inputText.trim(), sent: true}]);
      setInputText('');
    }
  };

  // Function to handle receiving a simulated response
  const receiveResponse = () => {
    setMessages([
      ...messages,
      {text: 'This is a simulated response.', sent: false},
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
      </View>
    </View>
  );
}

const chatviewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
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
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
});

export default function DigitalAvatar() {
  return <ChatView />;
}
