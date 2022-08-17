import firebase from "firebase/compat/app";
import "firebase/compat/auth"; //authorization

import "firebase/compat/storage";
import "firebase/compat/firestore"; // db
import { serverTimestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoCGv7y3kve7kfxeksluDkZY2KR4Dy6IE",
    authDomain: "reels-f1588.firebaseapp.com",
    projectId: "reels-f1588",
    storageBucket: "reels-f1588.appspot.com",
    messagingSenderId: "173251193573",
    appId: "1:173251193573:web:462b6a619b7ba62fb7020c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users: firestore.collection("users"),
    posts: firestore.collection("posts"),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
};
export const storage = firebase.storage();
