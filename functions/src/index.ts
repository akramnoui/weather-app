import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sendPushNotification from "./sendPushNotification";
import {featchWeatherForescast} from "./util";


admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

export const sendPushNotificationOnWeatherAdd = functions.firestore
  .document("users/{userId}/cities/{cityId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const userUid = context.params.userId; // Use the userId from the context

    // Ensure the document has the necessary data
    if (!data || !data.name) {
      console.error("City data not found in the document.");
      return null;
    }

    const cityName = data.name;

    // Fetch weather data for the added city
    const weatherData = await featchWeatherForescast({
      cityName: cityName,
      days: "1", // You may adjust the number of days based on your needs
    });

    // Ensure weather data is available
    if (!weatherData || !weatherData.current) {
      console.error("Weather data not found or incomplete.");
      return null;
    }

    const temperature = weatherData.current.temp_c;

    // Fetch the user document to get the expoPushToken
    const userDocRef = db.doc(`users/${userUid}`);
    const userDocSnapshot = await userDocRef.get();

    if (!userDocSnapshot.exists) {
      console.error("User document not found.");
      return null;
    }

    const expoPushToken = userDocSnapshot.data()?.notificationToken;

    // Ensure the user document has an expoPushToken
    if (!expoPushToken) {
      console.error("expoPushToken not found in the user document.");
      return null;
    }

    // Send push notification with the temperature
    const res = await sendPushNotification({
      pushToken: expoPushToken,
      message: `Temperature in ${cityName}: ${temperature}°C`,
    });

    functions.logger.log("Response ++++++++", res);

    return null;
  });
