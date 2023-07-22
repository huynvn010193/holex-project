// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjR6Z4jlrvfR1dy1BJqNOpRcjH6lZVlVE",
  authDomain: "note-app-holetex-6bf85.firebaseapp.com",
  projectId: "note-app-holetex-6bf85",
  storageBucket: "note-app-holetex-6bf85.appspot.com",
  messagingSenderId: "331606506421",
  appId: "1:331606506421:web:f7fb8ba59d341398e937fc",
  measurementId: "G-FGF88BB013",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
