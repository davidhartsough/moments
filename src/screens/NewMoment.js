import React from "react";
import { useHistory } from "react-router-dom";
import MomentForm from "./components/MomentForm";
import { saveNewMoment } from "../store";

export default function EditMoment() {
  const history = useHistory();
  function onSave(date, people, places, as) {
    saveNewMoment(date, people, places, as).then(() => history.push("/"));
  }
  return <MomentForm onSave={onSave} />;
}
