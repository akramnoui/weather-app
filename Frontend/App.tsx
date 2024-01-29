import React, { useCallback } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import generatePushNotificationsToken from "./src/notifications/generatePushNotificationToken";
import usePushNotifications from "./src/notifications/usePushNotifications";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

const toggleNotifications = async () => {
  try {
    const token = await generatePushNotificationsToken();
    console.log(token);
  } catch (error) {
    console.log(error);
  }
};

export default function App() {
  const { notification } = usePushNotifications((response) =>
  console.log(response)
);
useEffect(() => {
  const setupNotifications = async () => {
    // requestUserPermission();
    try {
      await toggleNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  setupNotifications();
}, []);
const [fontsLoaded, fontError] = useFonts({
  'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
  'Poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),

});
const onLayoutRootView = useCallback(async () => {
  if (fontsLoaded || fontError) {
    await SplashScreen.hideAsync();
  }
}, [fontsLoaded, fontError]);

if (!fontsLoaded && !fontError) {
  return null;
}

 


  return <RootNavigator />;
}