import React from "react";
import { useHistory } from "react-router-dom";
import { X } from "react-feather";

export default function HeaderWithClose({ title }) {
  const history = useHistory();
  const close = () => history.goBack();
  return (
    <header>
      <h1>{title}</h1>
      <button onClick={close} className="close">
        <X />
      </button>
    </header>
  );
}
