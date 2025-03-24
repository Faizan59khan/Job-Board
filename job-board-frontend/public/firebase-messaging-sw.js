// Import the Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBptSSiCMPedDEWBZ3Ek23Bxkb5VFzaqRw",
  authDomain: "job-board-bee86.firebaseapp.com",
  projectId: "job-board-bee86",
  storageBucket: "job-board-bee86.firebasestorage.app",
  messagingSenderId: "818565083164",
  appId: "1:818565083164:web:b091c8b5f402ff5eebefd9",
  measurementId: "G-57NS25PLY2"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
