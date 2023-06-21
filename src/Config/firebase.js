// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzS_PwYLTCD86gv9pSOkDeZ1RL89i7SD8",
  authDomain: "news-c3485.firebaseapp.com",
  projectId: "news-c3485",
  storageBucket: "news-c3485.appspot.com",
  messagingSenderId: "372881831124",
  appId: "1:372881831124:web:de648e583ecd4a5a7e3741",
  measurementId: "G-XLXSFY2JFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);