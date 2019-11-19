import React from "react";
import { useHistory } from "react-router-dom";
import MomentForm from "./components/MomentForm";
import { getMomentToEdit, updateMoment } from "../store";
import PageLoader from "./components/PageLoader";

export default function EditMoment() {
  const history = useHistory();
  const { id } = getMomentToEdit();
  if (id === null) {
    history.goBack();
    return <PageLoader title="Moments" />;
  }
  function onSave(date, people, places, activities) {
    updateMoment(date, people, places, activities).then(() => history.goBack());
  }
  return <MomentForm onSave={onSave} isEdit={true} />;
}
