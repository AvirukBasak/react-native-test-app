/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {View, Text, Image, Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

function getMapImage({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  console.log('getMapImage', latitude, longitude);
  const api_key = '1156ef3690f2407c95a80c4169e51445';
  return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=400&height=400&center=lonlat:${longitude},${latitude}&marker=lonlat:${longitude},${latitude}&zoom=14&apiKey=${api_key}`;
}

export default function GeolocationScreen() {
  const [location, setLocation] = useState({latitude: 0, longitude: 0});

  useEffect(() => {
    async function getLocationFromModule(): Promise<{
      latitude: number;
      longitude: number;
    }> {
      return new Promise((resolve, reject) =>
        Geolocation.getCurrentPosition(
          (position: {coords: {latitude: any; longitude: any}}) => {
            if (!position.coords) {
              reject('No position data');
            }
            const {latitude, longitude} = position.coords;
            resolve({latitude, longitude});
          },
          (error: {message: any}) => console.error(error.message),
          {enableHighAccuracy: true},
        ),
      );
    }

    async function getLocationOnAndroid() {
      try {
        const stat = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location',
            message: 'This app would like to view your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (stat === PermissionsAndroid.RESULTS.GRANTED) {
          getLocationFromModule()
            .then(({latitude, longitude}) => {
              setLocation({latitude, longitude});
            })
            .catch(err => console.error(err));
        } else {
          console.error('Location permission', stat);
        }
      } catch (err) {
        console.warn(err);
      }
    }

    async function getLocationOnIOS() {
      Geolocation.requestAuthorization('whenInUse', (status: any) => {
        if (status === 'granted') {
          getLocationFromModule()
            .then(({latitude, longitude}) => {
              setLocation({latitude, longitude});
            })
            .catch(err => console.error(err));
        } else {
          console.error('Location permission', status);
        }
      });
    }

    if (Platform.OS === 'android') {
      getLocationOnAndroid();
    } else if (Platform.OS === 'ios') {
      getLocationOnIOS();
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
}
