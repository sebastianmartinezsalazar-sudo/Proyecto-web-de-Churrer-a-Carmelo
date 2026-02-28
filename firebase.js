// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyCIedhNq8QW3lhRkUeLYl1W7sYEFQmvZY0",
  authDomain: "churreria-carmelo.firebaseapp.com",
  databaseURL: "https://churreria-carmelo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "churreria-carmelo",
  storageBucket: "churreria-carmelo.firebasestorage.app",
  messagingSenderId: "912269341547",
  appId: "1:912269341547:web:865e3a74d733f6ab9d522e",
  measurementId: "G-4F1DEDGG8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);