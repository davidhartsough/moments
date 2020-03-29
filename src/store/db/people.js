import { getDocs, createDoc, updateCount, deleteDoc } from "./fb";

export function fetchPeople() {
  return getDocs("people");
}

export function createPerson(person) {
  return createDoc("people", person);
}

export function incrementPersonCount(id) {
  return updateCount("people", id, true);
}

export function decrementPersonCount(id) {
  return updateCount("people", id, false);
}

export function deletePerson({ id }) {
  return deleteDoc("people", id);
}
