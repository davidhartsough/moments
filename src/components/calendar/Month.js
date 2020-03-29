import React from "react";
import DayList from "./DayList";
import Loader from "../loaders/Loader";

export default function Month({ moments }) {
  if (moments.loading) return <Loader />;
  if (moments.momentsByMonth.length < 1) {
    return <p className="empty">No moments found for this month.</p>;
  }
  return <DayList moments={moments.momentsByMonth} />;
}
