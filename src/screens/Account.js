import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { X } from "react-feather";
import PageLoader from "./components/PageLoader";
import { getProfile } from "../store";
import "./Account.css";

export default function Account({ signOut }) {
  const history = useHistory();
  const close = () => history.goBack();
  const [profile, setProfile] = useState(false);
  useEffect(() => {
    setProfile(getProfile());
  }, []);
  if (profile === false) return <PageLoader title="Account" />;
  return (
    <main>
      <header>
        <h1>Account</h1>
        <button onClick={close} className="close">
          <X />
        </button>
      </header>
      <section id="account-profile">
        <p>You are currently logged in as:</p>
        <h2 id="profile-name">The Amazing {profile.name}</h2>
      </section>
      <footer>
        <button onClick={signOut} className="primary-action" id="sign-out">
          Sign out
        </button>
      </footer>
    </main>
  );
}
