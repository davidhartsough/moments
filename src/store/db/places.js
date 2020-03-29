import { getDocs, createDoc, updateCount, deleteDoc } from "./fb";

export function fetchPlaces() {
  return getDocs("places");
}

export function createPlace(place) {
  return createDoc("places", place);
}

export function incrementPlaceCount(id) {
  return updateCount("places", id, true);
}

export function decrementPlaceCount(id) {
  return updateCount("places", id, false);
}

export function deletePlace({ id }) {
  return deleteDoc("places", id);
}
