/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Image,
  Platform,
} from 'react-native';
import Contacts from 'react-native-contacts';

export default function ContactList() {
  const [contacts, setContacts] = useState([] as Contacts.Contact[]);

  useEffect(() => {
    async function loadContactsOnAndroid(): Promise<Contacts.Contact[]> {
      return new Promise((resolve, reject) => {
        try {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts',
              message: 'This app would like to view your contacts.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          )
            .then(stat => {
              if (stat === PermissionsAndroid.RESULTS.GRANTED) {
                resolve(Contacts.getAll());
              } else {
                reject(new Error(`Contacts permission ${stat}`));
              }
            })
            .catch(err => reject(err));
        } catch (error) {
          reject(error);
        }
      });
    }

    function loadContactsOnIOS(): Promise<Contacts.Contact[]> {
      return new Promise((resolve, reject) =>
        Contacts.checkPermission()
          .then(stat => {
            if (stat === 'authorized') {
              resolve(Contacts.getAll());
            } else {
              Contacts.requestPermission()
                .then(statReq => {
                  if (statReq === 'authorized') {
                    resolve(Contacts.getAll());
                  } else {
                    reject(new Error(`Contacts permission ${statReq}`));
                  }
                })
                .catch(err => reject(err));
            }
          })
          .catch(err => reject(err)),
      );
    }

    if (Platform.OS === 'android') {
      loadContactsOnAndroid()
        .then(c => setContacts(c))
        .catch(console.error);
    } else if (Platform.OS === 'ios') {
      loadContactsOnIOS()
        .then(c => setContacts(c))
        .catch(console.error);
    }
  }, []);

  function renderContact({item}: {item: Contacts.Contact}) {
    return (
      <View style={styles.contactContainer}>
        <Image
          source={{uri: item.thumbnailPath}}
          style={{width: 50, height: 50}}
        />
        <Text style={styles.name}>
          {item.givenName} {item.middleName} {item.familyName}
        </Text>
        {item.phoneNumbers.map((phone, index) => (
          <Text key={index} style={styles.phone}>
            {phone.number}
          </Text>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={item => item.recordID.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
  },
  contactContainer: {
    marginVertical: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 16,
    color: 'gray',
  },
});
