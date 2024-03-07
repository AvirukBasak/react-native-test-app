import React, {useEffect, useState} from 'react';
import {View, Text, Image, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';

const GeolocationScreen = () => {
  const [location, setLocation] = useState({latitude: 0, longitude: 0});

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (status === 'granted') {
          Geolocation.getCurrentPosition(
            (position: {coords: {latitude: any; longitude: any}}) => {
              if (!position.coords) {
                return;
              }
              const {latitude, longitude} = position.coords;
              setLocation({latitude, longitude});
            },
            (error: {message: any}) => console.error(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else {
          console.error('Permission denied', status);
        }
      } catch (err) {
        console.warn(err);
      }
    };

    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      Geolocation.requestAuthorization('whenInUse', (status: any) => {
        if (status === 'granted') {
          Geolocation.getCurrentPosition(
            (position: {coords: {latitude: any; longitude: any}}) => {
              if (!position.coords) {
                return;
              }
              const {latitude, longitude} = position.coords;
              setLocation({latitude, longitude});
            },
            (error: {message: any}) => console.error(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else {
          console.error('Permission denied');
        }
      });
    }
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {location ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=16&size=400x400&key=YOUR_GOOGLE_MAPS_API_KEY`,
          }}
          style={{width: 300, height: 300}}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default GeolocationScreen;
