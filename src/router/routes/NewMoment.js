import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { createMoment } from "../../store/actions/moments";
import MomentForm from "../../components/form";

function NewMoment({ _saveNewMoment }) {
  const history = useHistory();
  function onSave(newMoment) {
    _saveNewMoment(newMoment).then(() => history.push("/"));
  }
  return <MomentForm onSave={onSave} />;
}

const mapDispatchToProps = dispatch => ({
  _saveNewMoment: m => dispatch(createMoment(m))
});

export default connect(null, mapDispatchToProps)(NewMoment);
