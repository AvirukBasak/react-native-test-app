/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {View, Text, Image, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';

function getMapImage({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  console.log('getMapImage', latitude, longitude);
  const API_KEY = '1156ef3690f2407c95a80c4169e51445';
  return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=400&height=400&center=lonlat:${longitude},${latitude}&marker=lonlat:${longitude},${latitude}&zoom=14&apiKey=${API_KEY}`;
}

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
            {enableHighAccuracy: true},
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
            uri: getMapImage(location),
          }}
          style={{width: 400, height: 400}}
        />
      ) : (
        <Text style={{color: 'black'}}>Loading...</Text>
      )}
    </View>
  );
};

export default GeolocationScreen;
