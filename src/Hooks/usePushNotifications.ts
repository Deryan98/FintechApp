import {useState} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

export const usePushNotifications = () => {
  const [pushNotification] = useState(
    PushNotification.configure({
      onRegister: token => {
        console.log('TOKEN:', token);
      },
      onNotification: notification => {
        console.log('NOTIFICATION:', notification);
      },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    }),
  );

  console.log(pushNotification);

  // const priceIsHigh = () => {
  //   pushNotification.localNotification({
  //     title: 'notification',
  //     message: 'my noti mensaje',
  //   });
  // };
  return {
    pushNotification,
    // priceIsHigh,
  };
};

// Must be outside of any component LifeCycle (such as `componentDidMount`).
