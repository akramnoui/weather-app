import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';




// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDtj9SU5WwLS5o6-kluDzbtZFRvLESM4Cc",
    authDomain: "weatherapp-c0dfb.firebaseapp.com",
    projectId: "weatherapp-c0dfb",
    storageBucket: "weatherapp-c0dfb.appspot.com",
    messagingSenderId: "280288819844",
    appId: "1:280288819844:web:233b03f739b15f2ceae0d1",
    measurementId: "G-D8TMF9RTND"
  };
  

  const app = initializeApp(firebaseConfig);


export const firestore = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
