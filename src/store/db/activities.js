import { getDocs, createDoc, updateCount, deleteDoc } from "./fb";

export function fetchActivities() {
  return getDocs("activities");
}

export function createActivity(activity) {
  return createDoc("activities", activity);
}

export function incrementActivityCount(id) {
  return updateCount("activities", id, true);
}

export function decrementActivityCount(id) {
  return updateCount("activities", id, false);
}

export function deleteActivity({ id }) {
  return deleteDoc("activities", id);
}
