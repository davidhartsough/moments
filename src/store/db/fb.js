import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "./config";

let _db = null;
let _auth = null;
let _uid = null;

export function initDatabase() {
  if (firebase.apps.length === 0) firebase.initializeApp(config);
  _db = firebase.firestore();
  _auth = firebase.auth();
}

export const db = () => _db;

export const auth = () => _auth;

export const signInOptions = [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
  firebase.auth.FacebookAuthProvider.PROVIDER_ID
];

export const setUID = uid => {
  _uid = uid;
};

export const getUID = () => _uid;

const mapDocs = doc => ({
  id: doc.id,
  ...doc.data()
});

export function getDocs(collection) {
  return _db
    .collection(collection)
    .where("uid", "==", _uid)
    .get()
    .then(({ docs }) => docs.map(mapDocs))
    .catch(err => console.warn(`Error getting ${collection}: `, err));
}

export function getDoc(collection, id) {
  return _db
    .collection(collection)
    .doc(id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        throw new Error(`No doc found for the id: ${id}`);
      }
      return {
        id: doc.id,
        ...doc.data()
      };
    })
    .catch(err => console.warn(`Error getting doc from ${collection}: `, err));
}

export function createDoc(collection, item) {
  const newItem = { uid: _uid, ...item };
  return _db
    .collection(collection)
    .add(newItem)
    .then(({ id }) => ({
      id,
      ...newItem
    }))
    .catch(err => console.warn(`Error adding to ${collection}: `, err));
}

export function updateCount(collection, id, increment = true) {
  const docRef = _db.collection(collection).doc(id);
  return _db
    .runTransaction(ta =>
      ta.get(docRef).then(doc => {
        if (!doc.exists) {
          throw new Error(`Doc does not exist with the id: ${id}`);
        }
        const count = increment ? doc.data().count + 1 : doc.data().count - 1;
        if (count <= 0) return ta.delete(docRef);
        return ta.update(docRef, { count });
      })
    )
    .then(() => id)
    .catch(err => console.warn("Transaction failed: ", err));
}

export function deleteDoc(collection, id) {
  return _db
    .collection(collection)
    .doc(id)
    .delete()
    .then(() => id)
    .catch(err => console.warn("Error deleting: ", err));
}

export function updateDoc(collection, id, updates) {
  return _db
    .collection(collection)
    .doc(id)
    .update(updates)
    .then(() => id)
    .catch(err => console.error("Error updating doc: ", err));
}

export function getMomentsByMonth(month) {
  return _db
    .collection("moments")
    .where("uid", "==", _uid)
    .where("date", ">=", `${month}-01`)
    .where("date", "<=", `${month}-31`)
    .orderBy("date", "desc")
    .get()
    .then(({ docs }) => docs.map(mapDocs))
    .catch(e => console.warn("Error getting moments by month: ", e));
}

export function getMomentsByQuery(query, type) {
  return _db
    .collection("moments")
    .where("uid", "==", _uid)
    .where(type, "array-contains", query)
    .get()
    .then(({ docs }) => docs.map(mapDocs))
    .catch(err => console.warn("Error getting moments by query: ", err));
}
