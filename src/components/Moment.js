import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Calendar, Users, MapPin, Tag, MoreVertical } from "react-feather";
import { setMomentToEdit, deleteMoment } from "../store/actions/moments";
import { getDateString } from "../date-utils";
import "./Moment.css";

function Moment({ moment, showDate = false, _setMomentToEdit, _deleteMoment }) {
  const history = useHistory();
  const [deleted, setDeleted] = useState(false);
  const [visible, setVisible] = useState(false);
  const open = e => {
    setVisible(true);
    e.stopPropagation();
  };
  const close = () => setVisible(false);
  const { id, date, activities, people, places } = moment;
  function onEdit() {
    _setMomentToEdit(moment);
    history.push(`/edit/${id}`);
  }
  function onDelete() {
    _deleteMoment(moment);
    setDeleted(true);
  }
  if (deleted) return null;
  return (
    <div className="moment" onClick={close}>
      {showDate && (
        <div className="row">
          <Calendar className="row-icon" />
          <p className="row-text">{getDateString(date)}</p>
        </div>
      )}
      {!!people.length && (
        <div className="row">
          <Users className="row-icon" />
          <p className="row-text">{people.join(", ")}</p>
        </div>
      )}
      {!!places.length && (
        <div className="row">
          <MapPin className="row-icon" />
          <p className="row-text">{places.join(", ")}</p>
        </div>
      )}
      {!!activities.length && (
        <div className="row">
          <Tag className="row-icon" />
          <p className="row-text">{activities.join(", ")}</p>
        </div>
      )}
      <div className="open-menu" onClick={open}>
        <MoreVertical size={20} />
      </div>
      <div className={`modal-menu${visible ? " show" : ""}`}>
        <div className="modal-menu-option" onClick={onEdit}>
          Edit
        </div>
        <div className="modal-menu-option" onClick={onDelete}>
          Delete
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  _setMomentToEdit: m => dispatch(setMomentToEdit(m)),
  _deleteMoment: m => dispatch(deleteMoment(m))
});

export default connect(null, mapDispatchToProps)(Moment);
