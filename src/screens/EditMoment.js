import React from "react";
import { useHistory } from "react-router-dom";
import MomentForm from "./components/MomentForm";
import { getMomentToEdit, updateMoment } from "../store";

export default function EditMoment() {
  const history = useHistory();
  const { id, moment } = getMomentToEdit();
  if (id === null) {
    history.goBack();
  }
  return (
    <MomentForm title="Edit Moment" onSave={updateMoment} moment={moment} />
  );
}
