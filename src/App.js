import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import SignIn from "./screens/SignIn";
import Main from "./screens/Main";
import Loader from "./screens/components/Loader";
import Splash from "./screens/components/Splash";
import { setUID, setProfile } from "./store";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const signIn = () => setIsSignedIn(true);
  const signOut = () => setIsSignedIn(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUID(user.uid);
        setProfile(user.displayName, user.email);
        signIn();
      } else {
        signOut();
      }
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <Splash>
        <Loader />
      </Splash>
    );
  }
  if (!isSignedIn) return <SignIn />;
  return <Main signOut={signOut} />;
}
