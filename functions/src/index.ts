/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sendPushNotification from "./sendPushNotification";
import {featchWeatherForescast} from "./util";


admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
export const sendPushNotificationOnWeatherAdd = functions.firestore
  .document("users/{userId}/thresholds/{thresholdsId}")
  .onCreate(async (snap, context) => {
    const promises: Promise<void>[] = [];

    const data = snap.data();
    if (!data) {
      console.error("Threshold data not found.");
      return null;
    }

    // Fetch all user documents
    const usersSnapshot = await db.collection("users").get();

    if (usersSnapshot.empty) {
      console.log("No users found.");
      return null;
    }

    // Loop through each user document
    usersSnapshot.forEach(async (userDoc) => {
      const userUid = userDoc.id;

      // Fetch all thresholds for the current user
      const thresholdsSnapshot =
        await db.collection(`users/${userUid}/thresholds`).get();

      if (thresholdsSnapshot.empty) {
        functions.logger.log(`No thresholds found for user ${userUid}.`);
        return null;
      }

      // Loop through each threshold and check for alerts
      thresholdsSnapshot.forEach(async (thresholdDoc) => {
        const thresholdData = thresholdDoc.data();
        const cityName = thresholdData.city;

        // Fetch weather data for the city
        const weatherData = await featchWeatherForescast({
          cityName: cityName,
          days: "1", // You may adjust the number of days based on your needs
        });

        // Check for alerts and send notifications
        if (weatherData && weatherData.current) {
          const expoPushToken = userDoc.data()?.notificationToken;

          // Check each threshold field and compare with weather data
          Object.keys(thresholdData).forEach((field) => {
            if (field !== "city" && field !== "type") {
              const thresholdValue = thresholdData[field];
              const thresholdType = thresholdData.type;

              type ApiFieldMapping = {
                [key: string]: string;
              };

              const apiFieldMapping: ApiFieldMapping = {
                windSpeed: "wind_kph",
                humidityLevel: "humidity",
                temperature: "temp_c",
                precipitation: "precip_mm",
                // Add other fields as needed
              };

              const apiFieldName = apiFieldMapping[field];
              const weatherValue = weatherData.current[apiFieldName];

              if (
                expoPushToken &&
                weatherValue !== undefined &&
                thresholdValue !== undefined
              ) {
                switch (thresholdType) {
                case "above":
                  if (weatherValue > thresholdValue) {
                    // Send push notification
                    promises.push(
                      sendPushNotification({
                        pushToken: expoPushToken,
                        // eslint-disable-next-line max-len
                        message: `${field} in ${cityName}: ${weatherValue} exceeds the threshold of ${thresholdValue}!`,
                      })
                    );
                  }
                  break;
                case "below":
                  if (weatherValue < thresholdValue) {
                    // Send push notification
                    promises.push(
                      sendPushNotification({
                        pushToken: expoPushToken,
                        // eslint-disable-next-line max-len
                        message: `${field} in ${cityName}: ${weatherValue} is below the threshold of ${thresholdValue}!`,
                      })
                    );
                  }
                  break;
                case "equals":
                  if (weatherValue === thresholdValue) {
                    // Send push notification
                    promises.push(
                      sendPushNotification({
                        pushToken: expoPushToken,
                        // eslint-disable-next-line max-len
                        message: `${field} in ${cityName}: ${weatherValue} equals the threshold of ${thresholdValue}!`,
                      })
                    );
                  }
                  break;
                default:
                  break;
                }
              }
            }
          });
        }
      });
    });

    // Wait for all promises to resolve before returning
    await Promise.all(promises);

    return null;
  });

export const checkThresholdAlerts = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Authentication required.");
  }

  const userId = context.auth.uid;

  // Fetch all thresholds for the current user
  const thresholdsSnapshot = await db.collection(`users/${userId}/thresholds`).get();

  if (thresholdsSnapshot.empty) {
    console.log(`No thresholds found for user ${userId}.`);
    return null;
  }

  const promises: any[] = [];

  // Loop through each threshold and check for alerts
  thresholdsSnapshot.forEach(async (thresholdDoc) => {
    const thresholdData = thresholdDoc.data();
    const cityName = thresholdData.city;

    // Fetch weather data for the city
    const weatherData = await featchWeatherForescast(cityName); // Implement this function to fetch weather data

    // Check for alerts and send notifications
    if (weatherData && weatherData.current) {
      // Use expoPushToken directly from the threshold data
      const expoPushToken = thresholdData.notificationToken;
      // Define a type with an index signature

      const apiFieldMapping: Record<string, string> = {
        windSpeed: "wind_kph",
        humidityLevel: "humidity",
        temperature: "temp_c",
        precipitation: "precip_mm",
        // Add other fields as needed
      };
      // Check each threshold field and compare with weather data
      Object.keys(thresholdData).forEach((field) => {
        if (field !== "city" && field !== "type") {
          const thresholdValue = thresholdData[field];
          const thresholdType = thresholdData.type;


          const apiFieldName = apiFieldMapping[field];
          const weatherValue = weatherData.current[apiFieldName];

          if (
            expoPushToken &&
              weatherValue !== undefined &&
              thresholdValue !== undefined
          ) {
            switch (thresholdType) {
            case "above":
              if (weatherValue > thresholdValue) {
                // Send push notification
                promises.push(
                  sendPushNotification({
                    pushToken: expoPushToken,
                    message: `${field} in ${cityName}: ${weatherValue} exceeds the threshold of ${thresholdValue}!`,
                  })
                );
              }
              break;
            case "below":
              if (weatherValue < thresholdValue) {
                // Send push notification
                promises.push(
                  sendPushNotification({
                    pushToken: expoPushToken,
                    message: `${field} in ${cityName}: ${weatherValue} is below the threshold of ${thresholdValue}!`,
                  })
                );
              }
              break;
            case "equals":
              if (weatherValue === thresholdValue) {
                // Send push notification
                promises.push(
                  sendPushNotification({
                    pushToken: expoPushToken,
                    message: `${field} in ${cityName}: ${weatherValue} equals the threshold of ${thresholdValue}!`,
                  })
                );
              }
              break;
            default:
              break;
            }
          }
        }
      });
    }
  });

  // Wait for all promises to resolve before returning
  await Promise.all(promises);

  return null;
});

export const checkAlertsAndSendNotifications = functions.pubsub
  .schedule("every 4 hours")
  .timeZone("Europe/Paris") // Set the timezone to Paris
  .onRun(async (context) => {
    // Fetch all user documents
    const usersSnapshot = await db.collection("users").get();

    if (usersSnapshot.empty) {
      console.log("No users found.");
      return null;
    }

    // Loop through each user document
    usersSnapshot.forEach(async (userDoc) => {
      const userUid = userDoc.id;

      // Fetch all thresholds for the current user
      const thresholdsSnapshot =
      await db.collection(`users/${userUid}/thresholds`).get();

      if (thresholdsSnapshot.empty) {
        console.log(`No thresholds found for user ${userUid}.`);
        return null;
      }

      // Loop through each threshold and check for alerts
      thresholdsSnapshot.forEach(async (thresholdDoc) => {
        const thresholdData = thresholdDoc.data();
        const cityName = thresholdData.name;

        // Fetch weather data for the city
        const weatherData = await featchWeatherForescast({
          cityName: cityName,
          days: "1", // You may adjust the number of days based on your needs
        });

        // Check for alerts and send notifications
        if (weatherData && weatherData.current) {
          const temperature = weatherData.current.temp_c;
          const expoPushToken = userDoc.data()?.notificationToken;

          if (expoPushToken && temperature > thresholdData.temperature) {
            // Send push notification
            await sendPushNotification({
              pushToken: expoPushToken,
              // eslint-disable-next-line max-len, max-len
              message: `Temperature in ${cityName}:
 ${temperature}°C exceeds the threshold!`,
            });
          }
        }
      });
    });

    return null;
  });

