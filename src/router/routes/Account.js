import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/auth";
import HeaderWithBack from "../../components/headers/HeaderWithBack";
import "./Account.css";

function Account({ profile, _onClick }) {
  return (
    <main>
      <HeaderWithBack title="Account" />
      <section id="account-profile">
        <p>You are currently logged in as:</p>
        {profile.name ? (
          <h2 id="profile-name">The Amazing {profile.name}</h2>
        ) : (
          <h2 id="profile-name">{profile.email}</h2>
        )}
      </section>
      <footer>
        <button onClick={_onClick} className="primary-action" id="sign-out">
          Sign out
        </button>
      </footer>
    </main>
  );
}

const mapDispatchToProps = dispatch => ({
  _onClick: () => dispatch(signOut())
});

export default connect(
  ({ auth: { profile } }) => ({ profile }),
  mapDispatchToProps
)(Account);
