import React from "react";
import Day from "./Day";

function compareDays(a, b) {
  if (a[0] > b[0]) return -1;
  if (a[0] < b[0]) return 1;
  return 0;
}

export default function DayList({ moments }) {
  const days = {};
  moments.forEach(m => {
    if (Array.isArray(days[m.date])) {
      days[m.date].push(m);
    } else {
      days[m.date] = [m];
    }
  });
  return Object.entries(days)
    .sort(compareDays)
    .map(day => <Day day={day[0]} key={day[0]} moments={day[1]} />);
}
