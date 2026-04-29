// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCIednNg8QW3lhRkUeLYl1W7sYEFQmvZYO",
  authDomain: "churreria-carmelo.firebaseapp.com",
  databaseURL: "https://churreria-carmelo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "churreria-carmelo",
  storageBucket: "churreria-carmelo.appspot.com",
  messagingSenderId: "912269341547",
  appId: "1:912269341547:web:865e3a74d733f6ab9d522e",
  measurementId: "G-4F1DEDGG8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;