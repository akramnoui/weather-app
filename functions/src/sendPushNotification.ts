import type {ExpoPushMessage} from "expo-server-sdk";
import {Expo} from "expo-server-sdk";

// Initialize Expo without access token
const expo = new Expo();

type SendPushNotificationProps = {
  pushToken: string;
  message: string;
};

const sendPushNotification = async ({
  pushToken,
  message,
}: SendPushNotificationProps): Promise<void> => {
  const messages: ExpoPushMessage[] = [];

  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return;
  }

  messages.push({
    to: pushToken,
    sound: "default",
    body: message,
  });

  try {
    await expo.sendPushNotificationsAsync(messages);
    console.log("Push notification sent successfully.");
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

export default sendPushNotification;
