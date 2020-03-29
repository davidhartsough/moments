import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateMoment, getMomentToEdit } from "../../store/actions/moments";
import MomentForm from "../../components/form";
import FormLoader from "../../components/loaders/FormLoader";

function EditMoment({
  id,
  goBack,
  _loading,
  _momentToEdit,
  _updateMoment,
  _getMomentToEdit
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (_momentToEdit === null || _momentToEdit.id !== id) {
      _getMomentToEdit(id);
    }
  }, [id, _momentToEdit, _getMomentToEdit]);
  function onSave(updated, previous) {
    setLoading(true);
    _updateMoment(updated, previous).then(() => goBack());
  }
  if (_loading || loading) return <FormLoader title="Edit Moment" />;
  return <MomentForm onSave={onSave} momentToEdit={_momentToEdit} />;
}

const mapDispatchToProps = dispatch => ({
  _updateMoment: (u, p) => dispatch(updateMoment(u, p)),
  _getMomentToEdit: id => dispatch(getMomentToEdit(id))
});

const Enhanced = connect(
  ({ moments: { loading, momentToEdit } }) => ({
    _loading: loading,
    _momentToEdit: momentToEdit
  }),
  mapDispatchToProps
)(EditMoment);

export default function() {
  const { id } = useParams();
  const history = useHistory();
  const goBack = () => history.goBack();
  if (id === null) goBack();
  return <Enhanced id={id} goBack={goBack} />;
}
