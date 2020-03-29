import * as db from "../db/activities";

const setLoading = (loading = true) => ({
  type: "set_activities_loading",
  payload: { loading }
});

const getActivities = data => ({
  type: "get_activities",
  payload: { data }
});

export const fetchActivities = () => (dispatch, getState) => {
  const { hasFetched } = getState().activities;
  if (hasFetched) return dispatch(setLoading(false));
  dispatch(setLoading());
  return db.fetchActivities().then(data => {
    return dispatch(getActivities(data));
  });
};

const create = created => ({
  type: "create_activity",
  payload: { created }
});

export const createActivity = name => dispatch => {
  dispatch(setLoading());
  const created = { name, count: 1 };
  return db.createActivity(created).then(data => dispatch(create(data)));
};

const increment = id => ({
  type: "increment_activity_count",
  payload: { id }
});

export const incrementActivityCount = id => dispatch => {
  dispatch(setLoading());
  return db.incrementActivityCount(id).then(() => dispatch(increment(id)));
};

const decrement = id => ({
  type: "decrement_activity_count",
  payload: { id }
});

export const decrementActivityCount = id => dispatch => {
  dispatch(setLoading());
  return db.decrementActivityCount(id).then(() => dispatch(decrement(id)));
};
