import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBg7hXblJmamPBTsBQEwATe15shOz-nuAE",
  authDomain: "proyecto-813b0.firebaseapp.com",
  projectId: "proyecto-813b0",
  storageBucket: "proyecto-813b0.appspot.com",
  messagingSenderId: "908738004746",
  appId: "1:908738004746:web:78b1f138d75dc2427c1cf3"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)