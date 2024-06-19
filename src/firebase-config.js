// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDChJoSZyW8FbgmqdBfl3cfi0N5dST0v9U",
  authDomain: "justice-consignment.firebaseapp.com",
  projectId: "justice-consignment",
  storageBucket: "justice-consignment.appspot.com",
  messagingSenderId: "776580269461",
  appId: "1:776580269461:web:556128901e8226fc2fa29c",
  measurementId: "G-HBZE4J3G3Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);