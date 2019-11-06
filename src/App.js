import React, { useState } from "react";
import SignIn from "./screens/SignIn";
import Main from "./screens/Main";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const signIn = () => setIsSignedIn(true);
  const signOut = () => setIsSignedIn(false);
  if (!isSignedIn) {
    return <SignIn signIn={signIn} />;
  }
  return <Main signOut={signOut} />;
}
