/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './src/FintechApp';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },

  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: 'stock-alert', // (required)
    channelName: 'High price reached', // (required)
    channelDescription: 'Notifies when a stocke reaches the watched price',
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

AppRegistry.registerComponent(appName, () => App);
