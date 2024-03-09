import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

interface CarrierData {
  name: string;
  number: string;
}

export default function InstalledPhoneNumber() {
  const [carrier, setCarrier] = useState({} as CarrierData);

  useEffect(() => {
    const getCarrier = async () => {
      try {
        setCarrier({
          name: DeviceInfo.getCarrierSync(),
          number: DeviceInfo.getPhoneNumberSync(),
        });
      } catch (error) {
        console.error('Error getting carrier data', error);
      }
    };

    getCarrier();
  }, []);

  return (
    <View>
      <Text>Carrier: {carrier.name}</Text>
      <Text>Phone number: {carrier.number}</Text>
    </View>
  );
}
