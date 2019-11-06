import React from "react";
import { Calendar, Users, MapPin, Tag } from "react-feather";

export default ({ moment }) => {
  const { date, tags, people, places } = moment;
  return (
    <div className="moment">
      <div className="row">
        <Calendar />
        <p>{date.toLocaleString()}</p>
      </div>
      <div className="row">
        <Users />
        <p>{people.join(", ")}</p>
      </div>
      <div className="row">
        <MapPin />
        <p>{places.join(", ")}</p>
      </div>
      <div className="row">
        <Tag />
        <p>{tags.join(". ")}</p>
      </div>
    </div>
  );
};
