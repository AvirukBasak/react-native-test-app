/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import PictureScreen from './src/views/picture';
import VideoScreen from './src/views/videos';
import GeolocationScreen from './src/views/geoloc';
import {View, Text, Button} from 'react-native';
import ContactList from './src/views/allContacts';
import InstalledPhoneNumber from './src/views/allSimNumbers';
import AutoOTP from './src/views/autoOTP';
import ChatBox from './src/views/chatBox';

const Stack = createStackNavigator();

const Home = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}>
      <Text>Home</Text>
      <Button
        title="Geolocation"
        onPress={() => navigation.navigate('Geolocation' as never)}
      />
      <Button
        title="Take Picture"
        onPress={() => navigation.navigate('Picture' as never)}
      />
      <Button
        title="Record Video"
        onPress={() => navigation.navigate('Video' as never)}
      />
      <Button
        title="Phone Number"
        onPress={() => navigation.navigate('PhoneNumber' as never)}
      />
      <Button
        title="All Contacts"
        onPress={() => navigation.navigate('Contacts' as never)}
      />
      <Button
        title="Auto OTP"
        onPress={() => navigation.navigate('AutoOTP' as never)}
      />
      <Button
        title="Digital Avatar"
        onPress={() => navigation.navigate('DigitalAvatar' as never)}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Geolocation"
          component={GeolocationScreen}
          options={{title: 'Geolocation'}}
        />
        <Stack.Screen
          name="Picture"
          component={PictureScreen}
          options={{title: 'Take Picture'}}
        />
        <Stack.Screen
          name="Video"
          component={VideoScreen}
          options={{title: 'Record Video'}}
        />
        <Stack.Screen
          name="PhoneNumber"
          component={InstalledPhoneNumber}
          options={{title: 'Phone Number'}}
        />
        <Stack.Screen
          name="Contacts"
          component={ContactList}
          options={{title: 'All Contacts'}}
        />
        <Stack.Screen
          name="AutoOTP"
          component={AutoOTP}
          options={{title: 'Auto OTP'}}
        />
        <Stack.Screen
          name="DigitalAvatar"
          component={ChatBox}
          options={{title: 'Digital Avatar'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
