import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Form from "./Form";
import Loader from "../loaders/Loader";
import HeaderWithClose from "../headers/HeaderWithClose";
import { fetchPeople } from "../../store/actions/people";
import { fetchPlaces } from "../../store/actions/places";
import { fetchActivities } from "../../store/actions/activities";
import "./Form.css";

function MomentForm({
  onSave,
  momentToEdit,
  _getPeople,
  _getPlaces,
  _getActivities
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([_getPeople(), _getPlaces(), _getActivities()]).then(() => {
      setLoading(false);
    });
  }, [_getPeople, _getPlaces, _getActivities, setLoading]);
  const title = `${momentToEdit === undefined ? "New" : "Edit"} Moment`;
  return (
    <main>
      <HeaderWithClose title={title} />
      <section>
        {loading ? (
          <Loader />
        ) : (
          <Form onSave={onSave} initialMoment={momentToEdit} />
        )}
      </section>
    </main>
  );
}

const mapDispatchToProps = dispatch => ({
  _getPeople: () => dispatch(fetchPeople()),
  _getPlaces: () => dispatch(fetchPlaces()),
  _getActivities: () => dispatch(fetchActivities())
});

export default connect(null, mapDispatchToProps)(MomentForm);
