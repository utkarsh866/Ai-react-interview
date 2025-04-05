import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Check if we're using mock Firebase credentials (in any environment)
const useMockFirebase = import.meta.env.VITE_FIREBASE_API_KEY === 'mock_firebase_api_key_12345' ||
  !import.meta.env.VITE_FIREBASE_API_KEY;

// Log Firebase mode for debugging
console.info(`Firebase using ${useMockFirebase ? 'mock' : 'real'} credentials`);

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

// Enable offline persistence for better user experience
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

export { db, useMockFirebase };
