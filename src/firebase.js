import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // Replace with your Firebase configuration
  apiKey: "AIzaSyA2bS4FQlut_xf69IOmn0drq2LRAyQyrjg",
  authDomain: "tictactoe-5c910.firebaseapp.com",
  projectId: "tictactoe-5c910",
  storageBucket: "tictactoe-5c910.firebasestorage.app",
  messagingSenderId: "836718978455",
  appId: "1:836718978455:web:a09c6747c20067ef4990d2",
  measurementId: "G-WK8NL4E6J7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
