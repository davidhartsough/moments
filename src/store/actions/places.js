import * as db from "../db/places";

const setLoading = (loading = true) => ({
  type: "set_places_loading",
  payload: { loading }
});

const getPlaces = data => ({
  type: "get_places",
  payload: { data }
});

export const fetchPlaces = () => (dispatch, getState) => {
  const { hasFetched } = getState().places;
  if (hasFetched) return dispatch(setLoading(false));
  dispatch(setLoading());
  return db.fetchPlaces().then(data => {
    return dispatch(getPlaces(data));
  });
};

const create = created => ({
  type: "create_place",
  payload: { created }
});

export const createPlace = name => dispatch => {
  dispatch(setLoading());
  const created = { name, count: 1 };
  return db.createPlace(created).then(data => dispatch(create(data)));
};

const increment = id => ({
  type: "increment_place_count",
  payload: { id }
});

export const incrementPlaceCount = id => dispatch => {
  dispatch(setLoading());
  return db.incrementPlaceCount(id).then(() => dispatch(increment(id)));
};

const decrement = id => ({
  type: "decrement_place_count",
  payload: { id }
});

export const decrementPlaceCount = id => dispatch => {
  dispatch(setLoading());
  return db.decrementPlaceCount(id).then(() => dispatch(decrement(id)));
};
