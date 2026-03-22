import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCIedhNq8QW3lhRkUeLYl1W7sYEFQmvZY0",
  authDomain: "churreria-carmelo.firebaseapp.com",
  databaseURL: "https://churreria-carmelo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "churreria-carmelo",
  storageBucket: "churreria-carmelo.appspot.com",
  messagingSenderId: "912269341547",
  appId: "1:912269341547:web:865e3a74d733f6ab9d522e",
  measurementId: "G-4F1DEDGG8M"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);