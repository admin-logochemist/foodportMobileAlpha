// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_m0QPsuUU_wh43oPrqM_zQ-DkCYzjQlc",
  authDomain: "foodcart-302716.firebaseapp.com",
  projectId: "foodcart-302716",
  storageBucket: "foodcart-302716.appspot.com",
  messagingSenderId: "960260955873",
  appId: "1:960260955873:web:928126e1bde6bb33bf21a0",
  measurementId: "G-384WHMMJJG"
};


// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;