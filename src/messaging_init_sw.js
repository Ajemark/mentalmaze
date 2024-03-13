import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore"
import { isSupported } from 'firebase/messaging';


const firebaseConfig = {
    apiKey: "AIzaSyAmqVLbfJrOw6mCNfnhvRECYLqvjY0YxHQ",
    authDomain: "mental-maze-notification.firebaseapp.com",
    projectId: "mental-maze-notification",
    storageBucket: "mental-maze-notification.appspot.com",
    messagingSenderId: "248494673484",
    appId: "1:248494673484:web:591b0c6fe2fd280451aee9"
};

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);
            getToken(messaging, { vapidKey: 'BDq-_mdZg2OwFSykWMpFLYXP9UdMgR63Zj7yvnmg_67eYPD1YJxUct1JNgA1VJlBT8c2LA3r3yy0i7PEWo7aNbo' })
                .then((currentToken) => {
                    if (currentToken) {
                        localStorage.setItem("fcmToken", currentToken)
                    } else {
                        console.log("Cannot find token")
                    }
                })
        } else {
            console.log("You dont have the permission")
        }
    });
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

const setFcmToken = async () => {
    const fcmToken = localStorage.getItem('fcmToken');
    if (fcmToken) {
        console.log("currentToken to stored", fcmToken);
        await setDoc(doc(db, "mental-maze-notification", fcmToken), {
            token: fcmToken,
        });
    }
};

try {
    if (isSupported()) {
        requestPermission()
    } else {
        throw new Error('Firebase messaging is not supported');
    }
} catch (error) {
    console.error('Error:', error.message);
}


setFcmToken();
