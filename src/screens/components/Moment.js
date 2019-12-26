import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Calendar, Users, MapPin, Tag, MoreVertical } from "react-feather";
import { setMomentToEdit, deleteMoment } from "../../store";
import "./Moment.css";

const options = {
  timeZone: "UTC",
  weekday: "long",
  month: "short",
  day: "numeric"
};
function getDayString(date) {
  return new Date(date).toLocaleDateString(undefined, options);
}

export default ({ id, moment, showDate }) => {
  const history = useHistory();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const open = e => {
    setIsOpen(true);
    e.stopPropagation();
  };
  const close = () => setIsOpen(false);
  const { date, activities, people, places } = moment;
  function onEdit() {
    setMomentToEdit(id, moment);
    history.push("/edit");
  }
  function onDelete() {
    deleteMoment(id, moment);
    setIsDeleted(true);
  }
  if (isDeleted) return null;
  return (
    <div className="moment" onClick={close}>
      {showDate && (
        <div className="row">
          <Calendar className="row-icon" />
          <p className="row-text">{getDayString(date)}</p>
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
      <div className={`modal-menu${isOpen ? " show" : ""}`}>
        <div className="modal-menu-option" onClick={onEdit}>
          Edit
        </div>
        <div className="modal-menu-option" onClick={onDelete}>
          Delete
        </div>
      </div>
    </div>
  );
};
