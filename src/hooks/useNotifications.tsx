import { useState, useEffect } from "react";
import { Platform, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

type NotificationHookResult = {
  expoPushToken: string;
};

const useNotification = (): NotificationHookResult => {
  const [expoPushToken, setExpoPushToken] = useState<string>('');

  useEffect(() => {
    const registerForPushNotificationsAsync = async (): Promise<void> => {
      let token: string;

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert('Failed to get push token for push notification!');
          throw new Error('Failed to get push token for push notification!');
        }
        const expoPushTokenResponse = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        token = expoPushTokenResponse.data;
        console.log(token);
      } else {
        Alert.alert('Must use a physical device for Push Notifications');
        throw new Error('Must use a physical device for Push Notifications');
      }

      setExpoPushToken(token);
    };

    registerForPushNotificationsAsync();
  }, []);

  return { expoPushToken };
};

export default useNotification;
