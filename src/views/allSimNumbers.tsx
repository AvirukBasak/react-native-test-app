/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {Text, View, PermissionsAndroid} from 'react-native';
import DeviceInfo from 'react-native-device-info';

interface CarrierData {
  name: string;
  number: string;
}

export default function InstalledPhoneNumber() {
  const [carrier, setCarrier] = useState({} as CarrierData);

  useEffect(() => {
    async function getCarrier() {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          {
            title: 'Phone State Permission',
            message:
              'This app needs access to your phone state ' +
              'so we can get your phone number.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )
          .then(stat => {
            if (stat !== PermissionsAndroid.RESULTS.GRANTED) {
              return PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS,
                {
                  title: 'Phone Number Permission',
                  message:
                    'This app needs access to your phone number ' +
                    'so we can get your phone number.',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
            } else {
              return Promise.resolve(stat);
            }
          })
          .then(stat => {
            if (stat === PermissionsAndroid.RESULTS.GRANTED) {
              setCarrier({
                name: DeviceInfo.getCarrierSync(),
                number: DeviceInfo.getPhoneNumberSync(),
              });
            } else {
              console.error(`Read phone state permission ${stat}`);
            }
          })
          .catch(err => {
            console.error(err);
          });
      } catch (error) {
        console.error('Error getting carrier data', error);
      }
    }

    getCarrier();
  }, []);

  return (
    <View>
      <Text style={{color: 'black'}}>Carrier: {carrier.name}</Text>
      <Text style={{color: 'black'}}>Phone number: {carrier.number}</Text>
    </View>
  );
}
