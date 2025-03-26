// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBptSSiCMPedDEWBZ3Ek23Bxkb5VFzaqRw",
  authDomain: "job-board-bee86.firebaseapp.com",
  projectId: "job-board-bee86",
  storageBucket: "job-board-bee86.firebasestorage.app",
  messagingSenderId: "818565083164",
  appId: "1:818565083164:web:b091c8b5f402ff5eebefd9",
  measurementId: "G-57NS25PLY2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

import axios from "axios";

// Register service worker
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      return await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
    } catch (error) {
      console.error("Service worker registration failed:", error);
    }
  }
};

// Request FCM Token
export const requestForToken = async (email) => {
  try {
    const registration = await registerServiceWorker();
    if (!registration) {
      throw new Error("Service worker registration failed");
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VUE_APP_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    console.log("FCM Token:", token);

    // Send token to backend
    if (token && email) {
      await axios.post("http://localhost:3000/auth/save-token", {
        email: email,
        fcmToken: token,
      });
    }

    return token;
  } catch (error) {
    console.error("Error fetching FCM token:", error);
  }
};

// Handle foreground notifications
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Received message:", payload);
      resolve(payload);
    });
  });

export { messaging };
