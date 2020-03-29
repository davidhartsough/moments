import * as db from "../db/moments";
import {
  incrementPersonCount,
  createPerson,
  decrementPersonCount
} from "./people";
import {
  incrementPlaceCount,
  createPlace,
  decrementPlaceCount
} from "./places";
import {
  incrementActivityCount,
  createActivity,
  decrementActivityCount
} from "./activities";

const createActions = {
  people: createPerson,
  places: createPlace,
  activities: createActivity
};
const incrementCountActions = {
  people: incrementPersonCount,
  places: incrementPlaceCount,
  activities: incrementActivityCount
};
const decrementCountActions = {
  people: decrementPersonCount,
  places: decrementPlaceCount,
  activities: decrementActivityCount
};
const types = ["people", "places", "activities"];

const setLoading = (loading = true) => ({
  type: "set_moments_loading",
  payload: { loading }
});

const setMomentsByMonth = (month, momentsByMonth) => ({
  type: "set_moments_by_month",
  payload: { month, momentsByMonth }
});

const setMomentsByQuery = (query, queryType, momentsByQuery) => ({
  type: "set_moments_by_query",
  payload: { query, queryType, momentsByQuery }
});

export const fetchMomentsByMonth = month => (dispatch, getState) => {
  if (getState().moments.month === month) return dispatch(setLoading(false));
  dispatch(setLoading());
  return db.fetchMomentsByMonth(month).then(data => {
    return dispatch(setMomentsByMonth(month, data));
  });
};

export const fetchMomentsByQuery = (query, type) => (dispatch, getState) => {
  const { moments } = getState();
  if (moments.query === query && moments.queryType === type) {
    return dispatch(setLoading(false));
  }
  dispatch(setLoading());
  return db.fetchMomentsByQuery(query, type).then(data => {
    return dispatch(setMomentsByQuery(query, type, data));
  });
};

const create = created => ({
  type: "create_moment",
  payload: { created }
});

const update = updated => ({
  type: "update_moment",
  payload: { updated }
});

const _map = ({ label }) => label;
function prepareMoment(m) {
  const _m = { ...m };
  types.forEach(t => {
    _m[t] = _m[t].map(_map);
  });
  return _m;
}
export const createMoment = newMoment => dispatch => {
  dispatch(setLoading());
  const _moment = prepareMoment(newMoment);
  return db.createMoment(_moment).then(data => {
    types.forEach(t => {
      newMoment[t].forEach(({ label, value, __isNew__ }) => {
        if (__isNew__) {
          dispatch(createActions[t](label));
        } else {
          dispatch(incrementCountActions[t](value));
        }
      });
    });
    return dispatch(create(data));
  });
};

export const updateMoment = (updated, previous) => (dispatch, getState) => {
  dispatch(setLoading());
  const _moment = prepareMoment(updated);
  return db.updateMoment(_moment).then(() => {
    const state = getState();
    types.forEach(t => {
      updated[t].forEach(({ label, value, __isNew__ }) => {
        if (!previous[t].includes(label)) {
          if (__isNew__) {
            dispatch(createActions[t](label));
          } else {
            dispatch(incrementCountActions[t](value));
          }
        }
      });
      previous[t].forEach(i => {
        if (!updated[t].map(({ label }) => label).includes(i)) {
          const index = state[t].data.findIndex(({ name }) => name === i);
          if (index >= 0) {
            dispatch(decrementCountActions[t](state[t].data[index].id));
          }
        }
      });
    });

    return dispatch(update(_moment));
  });
};

const remove = deleted => ({
  type: "delete_moment",
  payload: { deleted }
});

export const deleteMoment = deleted => (dispatch, getState) => {
  dispatch(setLoading());
  return db.deleteMoment(deleted).then(() => {
    const state = getState();
    types.forEach(t => {
      deleted[t].forEach(i => {
        const index = state[t].data.findIndex(({ name }) => name === i);
        if (index >= 0) {
          dispatch(decrementCountActions[t](state[t].data[index].id));
        }
      });
    });
    return dispatch(remove(deleted));
  });
};

const _setMomentToEdit = momentToEdit => ({
  type: "set_moment_to_edit",
  payload: { momentToEdit }
});

export const setMomentToEdit = momentToEdit => dispatch => {
  return dispatch(_setMomentToEdit(momentToEdit));
};

export const getMomentToEdit = id => dispatch => {
  dispatch(setLoading());
  return db.getMoment(id).then(m => dispatch(_setMomentToEdit(m)));
};
