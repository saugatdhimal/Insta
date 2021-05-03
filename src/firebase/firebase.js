import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-cW8s13iuagcbCOdxWILUEWxph0ygogI",
  authDomain: "insta-77.firebaseapp.com",
  projectId: "insta-77",
  storageBucket: "insta-77.appspot.com",
  messagingSenderId: "771506383690",
  appId: "1:771506383690:web:e8a5c76cc55f5aa64c2fb3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const { FieldValue } = firebaseApp.firestore;

export { auth, db, FieldValue }
