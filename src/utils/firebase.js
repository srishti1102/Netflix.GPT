import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgei-cuD12UJ3Fg7mOaSySaGhLVRiX_e8",
  authDomain: "netflix-8a7d4.firebaseapp.com",
  projectId: "netflix-8a7d4",
  storageBucket: "netflix-8a7d4.appspot.com",
  messagingSenderId: "490637709436",
  appId: "1:490637709436:web:662d6341e1d82ee26fb9f9",
  measurementId: "G-VL5TP9DFMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


 export const auth = getAuth();
