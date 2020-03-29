import {
  createDoc,
  deleteDoc,
  getDoc,
  getMomentsByMonth,
  getMomentsByQuery,
  updateDoc
} from "./fb";

export function fetchMomentsByMonth(month) {
  return getMomentsByMonth(month);
}

function getPluralType(type) {
  switch (type) {
    case "person":
      return "people";
    case "place":
      return "places";
    case "activity":
      return "activities";
    default:
      break;
  }
}

export function fetchMomentsByQuery(query, type) {
  const pluralType = getPluralType(type);
  return getMomentsByQuery(query, pluralType);
}

export function createMoment(created) {
  return createDoc("moments", created);
}
export function updateMoment({ id, date, people, places, activities }) {
  return updateDoc("moments", id, { date, people, places, activities });
}

export function deleteMoment({ id }) {
  return deleteDoc("moments", id);
}

export function getMoment(id) {
  return getDoc("moments", id);
}
