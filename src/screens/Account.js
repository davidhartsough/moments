import React from "react";
import { useHistory } from "react-router-dom";
import { LogOut, X } from "react-feather";

export default function Account({ signOut }) {
  const history = useHistory();
  const close = () => history.goBack();
  const profile = {
    displayName: "Sasha"
  };
  return (
    <main>
      <header>
        <h1>Account</h1>
        <button onClick={close} className="close">
          <X />
        </button>
      </header>
      <section>
        {!!profile.displayName ? (
          <h2>The Amazing {profile.displayName}.</h2>
        ) : (
          <p>This is you. You are "Steve".</p>
        )}
      </section>
      <footer>
        <button onClick={signOut} className="primary-action" id="sign-out">
          <LogOut size={18} />
          <span className="primary-action-text">Sign out</span>
        </button>
      </footer>
    </main>
  );
}
