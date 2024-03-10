import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {
  getHash,
  requestHint,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';

export default function AutoOTP() {
  const [hashFromMethod, setHashFromMethod] = React.useState<string[]>();
  const [otpFromMethod, setOtpFromMethod] = React.useState<string>();
  const [hint, setHint] = React.useState<string>();

  // using hook - you can use the startListener and stopListener to manually trigger listeners again.
  const {hash, otp, timeoutError} = useOtpVerify({
    numberOfDigits: 6,
  });

  // using methods
  React.useEffect(() => {
    getHash()
      .then(h => {
        setHashFromMethod(h);
        console.log(h);
      })
      .catch(console.log);
    requestHint().then(setHint).catch(console.log);
    startOtpListener(setOtpFromMethod);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inp}
        placeholder="Enter OTP"
        placeholderTextColor={'gray'}
        keyboardType="numeric"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        value={otp ? otp : !isNaN(Number(otpFromMethod)) ? otpFromMethod : ''}
        onChangeText={text => {
          if (text.length > 6) {
            text = text.slice(0, 6);
          }
          if (text.length === 6) {
            console.log('OTP =', text);
          }
          setOtpFromMethod(text);
        }}
      />
      <View style={styles.resultView}>
        <Text style={styles.resultHeader}>Using Methods</Text>
        <Text style={styles.txt}>Your Hash is: {hashFromMethod}</Text>
        <Text style={styles.txt}>
          Your message is: {encodeURIComponent(otpFromMethod || '')}
        </Text>
        <Text style={styles.txt}>Selected Mobile Number is: {hint}</Text>
      </View>
      <View style={styles.resultView}>
        <Text style={styles.resultHeader}>Using Hook</Text>
        <Text style={styles.txt}>Your Hash is: {hash}</Text>
        <Text style={styles.txt}>Your otp is: {otp}</Text>
        <Text style={styles.txt}>Timeout Error: {String(timeoutError)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultView: {
    margin: 10,
    width: '80%',
  },
  resultHeader: {
    fontSize: 18,
    marginBottom: 5,
    color: 'blue',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  txt: {
    color: 'black',
  },
  inp: {
    width: '80%',
    borderWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    borderColor: '#aaa',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
  },
});
