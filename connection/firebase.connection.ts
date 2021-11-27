import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB2CaSLMEfSJKJLO9XabAZR68Yy9znzYEA",
  authDomain: "lab-goolps.firebaseapp.com",
  projectId: "lab-goolps",
  storageBucket: "lab-goolps.appspot.com",
  messagingSenderId: "667228148908",
  appId: "1:667228148908:web:93253b2d220f36a7263b09",
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default app;
