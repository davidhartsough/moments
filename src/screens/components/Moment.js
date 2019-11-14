import React from "react";
import { Calendar, Users, MapPin, Tag } from "react-feather";
import "./Moment.css";

export default ({ moment }) => {
  const { date, activities, people, places } = moment;
  return (
    <div className="moment">
      <div className="row">
        <Calendar className="row-icon" />
        <p className="row-text">{new Date(date).toLocaleDateString()}</p>
      </div>
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
    </div>
  );
};
