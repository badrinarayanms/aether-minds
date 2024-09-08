// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aether-minds.firebaseapp.com",
  projectId: "aether-minds",
  storageBucket: "aether-minds.appspot.com",
  messagingSenderId: "968546912673",
  appId: "1:968546912673:web:5cb3d040a1cba2636f63e0",
  measurementId: "G-3H8TNLWVH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);



export {db};