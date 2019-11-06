import React from "react";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default function SignIn({ signIn }) {
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        console.log(authResult);
        const { user } = authResult;
        const { isNewUser } = authResult.additionalUserInfo;
        signIn();
        return true;
        // return false;
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
    <div id="sign-in">
      <h1>moments</h1>
      <h2>Sign in</h2>
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}
