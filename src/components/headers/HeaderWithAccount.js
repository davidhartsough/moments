import React from "react";
import { Link } from "react-router-dom";
import { User } from "react-feather";

export default function HeaderWithAccount({ title }) {
  return (
    <header>
      <h1>Amazing {title}</h1>
      <Link to="/account" className="header-link">
        <User />
      </Link>
    </header>
  );
}
