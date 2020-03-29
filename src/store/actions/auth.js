import { logOut } from "../db/auth";
import { setUID } from "../db/fb";

const setLoading = () => ({
  type: "set_auth_loading"
});

const signIn = (uid, name, email) => ({
  type: "sign_in",
  payload: { uid, name, email }
});

export const signOut = () => dispatch => {
  dispatch(setLoading());
  return logOut().then(() => {
    dispatch({ type: "CLEAR_STATE_RESET" });
    return dispatch({ type: "sign_out" });
  });
};

export const handleAuth = user => dispatch => {
  dispatch(setLoading());
  if (user) {
    const { uid, displayName, email } = user;
    setUID(uid);
    return dispatch(signIn(uid, displayName, email));
  } else {
    return dispatch({ type: "sign_out" });
  }
};

export const setAuthLoading = () => dispatch => {
  dispatch(setLoading());
};
