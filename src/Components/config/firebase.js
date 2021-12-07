import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB695t7LsFVCPrfapZistDNXP4R9lxO6To",
  authDomain: "clone1-b3ca7.firebaseapp.com",
  projectId: "clone1-b3ca7",
  storageBucket: "clone1-b3ca7.appspot.com",
  messagingSenderId: "689213160892",
  appId: "1:689213160892:web:c971403aa5fd5e2db97fb9",
  measurementId: "G-XH1K89YF6D",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
