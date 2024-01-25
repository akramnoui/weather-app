import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sendPushNotification from "./sendPushNotification";
import {featchWeatherForescast} from "./util";


admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

export const sendPushNotificationOnWeatherAdd = functions.firestore
  .document("users/{userId}/thresholds/{thresholdsId}")
  .onCreate(async () => {
    const promises: Promise<void>[] = [];

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
          const temperature = weatherData.current.temp_c;
          const expoPushToken = userDoc.data()?.notificationToken;

          if (expoPushToken && temperature < thresholdData.temperature) {
            // Send push notification
            promises.push(sendPushNotification({
              pushToken: expoPushToken,
              // eslint-disable-next-line max-len
              message: `Temperature in ${cityName}: ${temperature}°C exceeds the threshold!`,
            }));
          }
        }
      });
    });

    // Wait for all promises to resolve before returning
    await Promise.all(promises);

    return null;
  });

// export const checkAlertsAndSendNotifications = functions.pubsub
//   .schedule("every 4 hours")
//   .timeZone("your-timezone") // Specify your timezone
//   .onRun(async (context) => {
//     // Fetch all user documents
//     const usersSnapshot = await db.collection("users").get();

//     if (usersSnapshot.empty) {
//       console.log("No users found.");
//       return null;
//     }

//     // Loop through each user document
//     usersSnapshot.forEach(async (userDoc) => {
//       const userUid = userDoc.id;

//       // Fetch all thresholds for the current user
//       const thresholdsSnapshot =
//       await db.collection(`users/${userUid}/thresholds`).get();

//       if (thresholdsSnapshot.empty) {
//         console.log(`No thresholds found for user ${userUid}.`);
//         return null;
//       }

//       // Loop through each threshold and check for alerts
//       thresholdsSnapshot.forEach(async (thresholdDoc) => {
//         const thresholdData = thresholdDoc.data();
//         const cityName = thresholdData.name;

//         // Fetch weather data for the city
//         const weatherData = await featchWeatherForescast({
//           cityName: cityName,
//           days: "1", // You may adjust the number of days based on your needs
//         });

//         // Check for alerts and send notifications
//         if (weatherData && weatherData.current) {
//           const temperature = weatherData.current.temp_c;
//           const expoPushToken = userDoc.data()?.notificationToken;

//           if (expoPushToken && temperature > thresholdData.temperature) {
//             // Send push notification
//             await sendPushNotification({
//               pushToken: expoPushToken,
//               // eslint-disable-next-line max-len, max-len
//               message: `Temperature in ${cityName}:
//  ${temperature}°C exceeds the threshold!`,
//             });
//           }
//         }
//       });
//     });

//     return null;
//   });

