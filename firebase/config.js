// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey = process.env.NEXT_PUBLIC_APIKEY_FIREBASE;
const authDomain = process.env.NEXT_PUBLIC_AUTHDOMAIN_FIREBASE;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE;
const storageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGIN_SENDER_ID_FIREBASE;
const appId = process.env.NEXT_PUBLIC_APP_ID_FIREBASE;
const measurementId = process.env.NEXT_PUBLIC_MEASUREMENT_ID_FIREBASE;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Authentication
const auth = getAuth(app);
const storage = getStorage(app)
auth.languageCode = 'es';

export {
  app,
  // analytics,
  auth,
  storage,
}