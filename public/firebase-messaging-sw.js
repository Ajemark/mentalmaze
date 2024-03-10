// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyAmqVLbfJrOw6mCNfnhvRECYLqvjY0YxHQ",
    authDomain: "mental-maze-notification.firebaseapp.com",
    projectId: "mental-maze-notification",
    storageBucket: "mental-maze-notification.appspot.com",
    messagingSenderId: "248494673484",
    appId: "1:248494673484:web:591b0c6fe2fd280451aee9"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});