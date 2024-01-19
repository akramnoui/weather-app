"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expo_server_sdk_1 = require("expo-server-sdk");
// Initialize Expo without access token
const expo = new expo_server_sdk_1.Expo();
const sendPushNotification = async ({ pushToken, message, }) => {
    const messages = [];
    if (!expo_server_sdk_1.Expo.isExpoPushToken(pushToken)) {
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
    }
    catch (error) {
        console.error("Error sending push notification:", error);
    }
};
exports.default = sendPushNotification;
//# sourceMappingURL=sendPushNotification.js.map