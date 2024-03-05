// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg7hXblJmamPBTsBQEwATe15shOz-nuAE",

  authDomain: "proyecto-813b0.firebaseapp.com",

  projectId: "proyecto-813b0",

  storageBucket: "proyecto-813b0.appspot.com",

  messagingSenderId: "908738004746",

  appId: "1:908738004746:web:78b1f138d75dc2427c1cf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;