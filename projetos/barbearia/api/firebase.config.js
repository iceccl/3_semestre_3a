// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNOiwP0l6YUgDBcA0KVD62RegIyd0CVzM",
  authDomain: "listacompras-ab0de.firebaseapp.com",
  projectId: "listacompras-ab0de",
  storageBucket: "listacompras-ab0de.firebasestorage.app",
  messagingSenderId: "1057369267504",
  appId: "1:1057369267504:web:6a3acff3dfd5533aa83cf5",
  measurementId: "G-V93FBHBSHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)