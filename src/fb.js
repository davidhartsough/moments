import firebase from "firebase/app";
// import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import config from "./config";
import { setDB } from "./store";

export default function initFirebase() {
  firebase.initializeApp(config);
  // firebase.analytics();
  setDB(firebase.firestore());
}
