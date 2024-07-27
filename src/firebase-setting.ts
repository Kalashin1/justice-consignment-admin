// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMqy2w3QOZVU31PKElsTZEMq80sBe66zc",
  authDomain: "ups-logistics.firebaseapp.com",
  projectId: "ups-logistics",
  storageBucket: "ups-logistics.appspot.com",
  messagingSenderId: "52914475574",
  appId: "1:52914475574:web:e666f28e3f4ecfe848be97",
  measurementId: "G-SWFBMZQMX5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
