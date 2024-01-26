import { useEffect, useRef, useState } from 'react';
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  removeNotificationSubscription,
  setNotificationChannelAsync,
  setNotificationHandler,
} from 'expo-notifications';
import type { Subscription } from 'expo-modules-core';
import type { Notification, NotificationResponse } from 'expo-notifications';
import { Platform } from 'react-native';

setNotificationHandler({
  // eslint-disable-next-line @typescript-eslint/require-await
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const usePushNotifications = (
  onTapNotification?: (response: NotificationResponse) => void
): {
  notification: Notification | null;
} => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    const setupPushNotifications = async () => {
 notificationListener.current = addNotificationReceivedListener(notification => {
    setNotification(notification);
  });
      responseListener.current = addNotificationResponseReceivedListener(response => {
        console.log(response);
        onTapNotification?.(response)
      });
      if (Platform.OS === 'android') {
        await setNotificationChannelAsync('default', {
          name: 'default',
          importance: AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    };

    setupPushNotifications();

    return () => {
      if (notificationListener.current) {
        removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        removeNotificationSubscription(responseListener.current);
      }
    };
  }, [onTapNotification]);

  return { notification };
};

export default usePushNotifications;
