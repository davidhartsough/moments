import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Splash from "../components/Splash";
import { signInOptions, auth } from "../store/db/fb";
import "./SignIn.css";

export default function SignIn() {
  return (
    <Splash>
      <h2 id="sign-in-title">Sign in</h2>
      <div id="sign-in">
        <StyledFirebaseAuth
          uiConfig={{
            signInSuccessUrl: "/",
            signInOptions
          }}
          firebaseAuth={auth()}
        />
      </div>
    </Splash>
  );
}
