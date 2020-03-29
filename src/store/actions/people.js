import * as db from "../db/people";

const setLoading = (loading = true) => ({
  type: "set_people_loading",
  payload: { loading }
});

const getPeople = data => ({
  type: "get_people",
  payload: { data }
});

export const fetchPeople = () => (dispatch, getState) => {
  const { hasFetched } = getState().people;
  if (hasFetched) return dispatch(setLoading(false));
  dispatch(setLoading());
  return db.fetchPeople().then(data => {
    return dispatch(getPeople(data));
  });
};

const create = created => ({
  type: "create_person",
  payload: { created }
});

export const createPerson = name => dispatch => {
  dispatch(setLoading());
  const created = { name, count: 1 };
  return db.createPerson(created).then(data => dispatch(create(data)));
};

const increment = id => ({
  type: "increment_person_count",
  payload: { id }
});

export const incrementPersonCount = id => dispatch => {
  dispatch(setLoading());
  return db.incrementPersonCount(id).then(() => dispatch(increment(id)));
};

const decrement = id => ({
  type: "decrement_person_count",
  payload: { id }
});

export const decrementPersonCount = id => dispatch => {
  dispatch(setLoading());
  return db.decrementPersonCount(id).then(() => dispatch(decrement(id)));
};
