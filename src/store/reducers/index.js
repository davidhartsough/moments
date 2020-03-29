import { combineReducers } from "redux";
import auth from "./auth";
import moments from "./moments";
import people from "./people";
import places from "./places";
import activities from "./activities";

const appReducer = combineReducers({
  auth,
  moments,
  people,
  places,
  activities
});

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_STATE_RESET") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
