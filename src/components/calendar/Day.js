import React from "react";
import Moment from "../Moment";
import { getDayString } from "../../date-utils";

export default function Day({ day, moments }) {
  return (
    <div className="day">
      <div className="day-header">
        <hr className="day-divider" />
        <h3 className="day-title">{getDayString(day)}</h3>
      </div>
      {moments.map(m => (
        <Moment key={m.id} moment={m} showDate={false} />
      ))}
    </div>
  );
}
