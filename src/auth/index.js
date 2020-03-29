import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { handleAuth, setAuthLoading } from "../store/actions/auth";
import { handleAuthState } from "../store/db/auth";
import SplashLoader from "../components/loaders/SplashLoader";
import SignIn from "./SignIn";

function Authenticator({ children, auth, _handleAuth, _setAuthLoading }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    _setAuthLoading();
    handleAuthState(user => {
      setLoading(false);
      _setAuthLoading();
      _handleAuth(user);
    });
  }, [_setAuthLoading, _handleAuth]);
  if (auth.loading || loading) return <SplashLoader />;
  if (auth.isSignedIn) return children;
  return <SignIn />;
}

const mapDispatchToProps = dispatch => ({
  _handleAuth: user => dispatch(handleAuth(user)),
  _setAuthLoading: () => dispatch(setAuthLoading())
});

export default connect(
  ({ auth }) => ({ auth }),
  mapDispatchToProps
)(Authenticator);
