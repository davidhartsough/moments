import { auth } from "./fb";

export function handleAuthState(handler) {
  return auth().onAuthStateChanged(handler);
}

export function logOut() {
  return auth().signOut();
}
