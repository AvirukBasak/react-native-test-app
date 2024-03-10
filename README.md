## List of tests runs

[Download for Android](https://github.com/AvirukBasak/react-native-test-app/releases/download/0.1/app-release.apk)

### Camera
Since native camera app is used to record videos or capture images, the app doesn't require camera permissions

### Location
App requires location permissions to get fine location of the user.

### Contacts
App requires contacts permissions to get the user's contacts.

### Phone Number
App requires `READ_PHONE_STATE` or `READ_PHONE_NUMBERS` permissions to get the user's phone number.

### Auto OTP Verification
Uses Android's new SMS Retriever API to automatically read the OTP from the SMS.
On iOS, this feature is untested.

```
<#> Your Test App one-time code is 123456
on6dLiLvedR
```

The above message is sent by the server to the user's phone number. The app will automatically read the OTP and fill it in the OTP field.
The hash `on6dLiLvedR` is used to identify the this app from the message.

NOTE: This is not the release hash, this is the hash used for testing purposes.
