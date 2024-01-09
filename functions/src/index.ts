/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sendPushNotification from "./sendPushNotification";


admin.initializeApp();

export const sendPushNotificationOnWeatherAdd = functions.firestore
  .document("weather/{weatherId}")
  .onCreate(async () => {
    // const data = snap.data();

    // // Ensure the document has an expoPushToken
    // if (!data.expoPushToken) {
    //   console.error("expoPushToken not found in the document.");
    //   return null;
    // }

    // Send push notification
    const res = await sendPushNotification({
      pushToken: "ExponentPushToken[6bDPBYIad_zmhOHF-mt2gm]",
      message: "Hello... is this thing working?",
    });
    functions.logger.log("respooonse ++++++++", res);

    return null;
  });
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
