import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from "firebase/firestore";

// Check if we're in development mode with mock credentials
const isDevelopmentMode = import.meta.env.DEV &&
  (import.meta.env.VITE_FIREBASE_API_KEY === 'mock_firebase_api_key_12345' ||
   !import.meta.env.VITE_FIREBASE_API_KEY);

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// In development mode, enable offline persistence
if (isDevelopmentMode) {
  console.log('Running in development mode with offline Firestore');

  // Enable offline persistence (this might fail in some browsers, so we catch errors)
  try {
    enableIndexedDbPersistence(db)
      .then(() => console.log('Firestore offline persistence enabled'))
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          console.warn('Firestore persistence failed: Multiple tabs open');
        } else if (err.code === 'unimplemented') {
          console.warn('Firestore persistence is not available in this browser');
        } else {
          console.error('Firestore persistence error:', err);
        }
      });
  } catch (error) {
    console.warn('Could not enable Firestore persistence:', error);
  }
}

export { db, isDevelopmentMode };
