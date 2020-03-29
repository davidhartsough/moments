import React from "react";
import { useHistory } from "react-router-dom";
import { ArrowLeft } from "react-feather";

export default function HeaderWithBack({ title }) {
  const history = useHistory();
  const goBack = () => history.goBack();
  return (
    <header className="header-with-back">
      <button onClick={goBack} className="go-back">
        <ArrowLeft />
      </button>
      <h1 className="title-with-back">{title}</h1>
    </header>
  );
}
