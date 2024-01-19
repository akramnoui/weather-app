"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotificationOnWeatherAdd = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sendPushNotification_1 = require("./sendPushNotification");
const util_1 = require("./util");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
exports.sendPushNotificationOnWeatherAdd = functions.firestore
    .document("users/{userId}/cities/{cityId}")
    .onCreate(async (snap, context) => {
    var _a;
    const data = snap.data();
    const userUid = context.params.userId; // Use the userId from the context
    // Ensure the document has the necessary data
    if (!data || !data.name) {
        console.error("City data not found in the document.");
        return null;
    }
    const cityName = data.name;
    // Fetch weather data for the added city
    const weatherData = await (0, util_1.featchWeatherForescast)({
        cityName: cityName,
        days: "1", // You may adjust the number of days based on your needs
    });
    // Ensure weather data is available
    if (!weatherData || !weatherData.current) {
        console.error("Weather data not found or incomplete.");
        return null;
    }
    const temperature = weatherData.current.temp_c;
    // Fetch alerts for the added city
    const alerts = await (0, util_1.fetchWeatherAlerts)({ cityName: cityName });
    // Extract the first alert title if available
    const alertTitle = alerts.alerts.alert.length > 0 ? alerts.alerts.alert[0].category : null;
    // Fetch the user document to get the expoPushToken
    const userDocRef = db.doc(`users/${userUid}`);
    const userDocSnapshot = await userDocRef.get();
    if (!userDocSnapshot.exists) {
        console.error("User document not found.");
        return null;
    }
    const expoPushToken = (_a = userDocSnapshot.data()) === null || _a === void 0 ? void 0 : _a.notificationToken;
    // Ensure the user document has an expoPushToken
    if (!expoPushToken) {
        console.error("expoPushToken not found in the user document.");
        return null;
    }
    // Send push notification with the temperature and alert title
    const message = alertTitle ?
        `Weather Alert in ${cityName}: ${alertTitle}` :
        `Temperature in ${cityName}: ${temperature}°C`;
    await (0, sendPushNotification_1.default)({
        pushToken: expoPushToken,
        message: message,
    });
    return null;
});
//# sourceMappingURL=index.js.map