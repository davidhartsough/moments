let db = null;
export function setDB(database) {
  db = database;
}
let uid = null;
export function setUID(userId) {
  uid = userId;
}
const profile = {};
export function setProfile(name, email) {
  profile.name = name;
  profile.email = email;
}
export const getProfile = () => profile;

const all = {
  people: null,
  places: null,
  activities: null
};
export function getDocs(cName) {
  if (all[cName] === null) {
    return db
      .collection(cName)
      .where("uid", "==", uid)
      .get()
      .then(({ docs }) => {
        all[cName] = docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return all[cName];
      })
      .catch(err => console.error(`Error getting ${cName}: `, err));
  }
  return new Promise(resolve => resolve(all[cName]));
}

const momentsByMonth = {
  month: null,
  moments: null
};
export function getMomentsByMonth(month) {
  if (momentsByMonth.month === month) {
    return new Promise(resolve => resolve(momentsByMonth.moments));
  }
  momentsByMonth.month = month;
  return db
    .collection("moments")
    .where("uid", "==", uid)
    .where("date", ">=", `${month}-01`)
    .where("date", "<=", `${month}-31`)
    .orderBy("date", "desc")
    .get()
    .then(({ docs }) => {
      momentsByMonth.moments = docs;
      return docs;
    })
    .catch(e => console.error("Error getting moments by month: ", e));
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
const momentsByQuery = {
  type: null,
  query: null,
  moments: null
};
export function getMomentsByQuery(type, query) {
  if (momentsByQuery.type === type && momentsByQuery.query === query) {
    return new Promise(resolve => resolve(momentsByQuery.moments));
  }
  momentsByQuery.type = type;
  momentsByQuery.query = query;
  const pluralType = getPluralType(type);
  return db
    .collection("moments")
    .where("uid", "==", uid)
    .where(pluralType, "array-contains", query)
    .get()
    .then(({ docs }) => {
      momentsByQuery.moments = docs;
      return docs;
    })
    .catch(err => console.error("Error getting moments by query: ", err));
}

function addToStore(cName, doc, id) {
  if (all[cName]) {
    all[cName].push({ id, ...doc });
  }
}
function incrementItemCount(cName, id) {
  if (all[cName]) {
    const index = all[cName].findIndex(i => i.id === id);
    all[cName][index].count += 1;
  }
}
const date = new Date();
const currentMonthNumber = date.getMonth() + 1;
const currentYear = date.getFullYear();
const currentMonth = `${currentYear}-${currentMonthNumber}`;
const compareMomentDocs = (a, b) => {
  if (a.data().date > b.data().date) return 1;
  if (a.data().date < b.data().date) return -1;
  return 0;
};
function addNewMomentToStore(id, newMoment) {
  if (momentsByMonth.month === currentMonth) {
    const moment = {
      id,
      data: () => newMoment
    };
    if (
      Array.isArray(momentsByMonth.moments) &&
      momentsByMonth.moments.length
    ) {
      momentsByMonth.moments.push(moment);
      momentsByMonth.moments.sort(compareMomentDocs);
    } else {
      momentsByMonth.moments = [moment];
    }
  } else {
    momentsByMonth.month = null;
  }
}
function resetMoments() {
  momentsByQuery.type = null;
  momentsByQuery.query = null;
}
export function saveNewMoment(
  dateInput,
  peopleInput,
  placesInput,
  activitiesInput
) {
  const inputs = {
    people: peopleInput || [],
    places: placesInput || [],
    activities: activitiesInput || []
  };
  for (const [key, value] of Object.entries(inputs)) {
    for (const item of value) {
      if (item.__isNew__) {
        const newDoc = {
          uid,
          name: item.value,
          count: 1
        };
        db.collection(key)
          .add(newDoc)
          .then(({ id }) => addToStore(key, newDoc, id))
          .catch(err => console.error("db add error: ", err));
      } else {
        const docRef = db.collection(key).doc(item.value);
        db.runTransaction(ta =>
          ta
            .get(docRef)
            .then(doc => ta.update(docRef, { count: doc.data().count + 1 }))
        )
          .then(() => incrementItemCount(key, item.value))
          .catch(err => console.error("Transaction failed: ", err));
      }
    }
  }
  const newMoment = {
    uid,
    date: dateInput.toISOString().substring(0, 10),
    people: peopleInput ? peopleInput.map(p => p.label) : [],
    places: placesInput ? placesInput.map(p => p.label) : [],
    activities: activitiesInput ? activitiesInput.map(a => a.label) : []
  };
  return db
    .collection("moments")
    .add(newMoment)
    .then(({ id }) => {
      addNewMomentToStore(id, newMoment);
      resetMoments();
    })
    .catch(err => console.error("Error adding moment: ", err));
}
