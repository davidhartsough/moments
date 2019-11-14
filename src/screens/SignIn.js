import React from "react";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Splash from "./components/Splash";
import "./SignIn.css";

export default function SignIn() {
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        const { user } = authResult;
        const { isNewUser } = authResult.additionalUserInfo;
        console.group("sign in success");
        console.log(authResult);
        console.log(user);
        console.log("uid: ", user.uid);
        console.log("displayName: ", user.displayName);
        console.log("isNewUser: ", isNewUser);
        console.groupEnd();
        // return true;
        return false;
      }
    },
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ]
  };
  return (
    <Splash>
      <h2 id="sign-in-title">Sign in</h2>
      <div id="sign-in">
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </Splash>
  );
}
