import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import config from "./config";

export default function initFirebase() {
  firebase.initializeApp(config);
  firebase.analytics();
}

// const db = firebase.firestore();
