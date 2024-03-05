import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PictureScreen from './src/views/picture';
import VideoScreen from './src/views/videos';
import GeolocationScreen from './src/views/geoloc';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Picture">
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
          name="Geolocation"
          component={GeolocationScreen}
          options={{title: 'Geolocation'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
