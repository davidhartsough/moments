import React from "react";
import AltDatePicker from "./AltDatePicker";
import { todayISO } from "../../date-utils";

const testDateInputElement = document.createElement("input");
testDateInputElement.type = "date";
testDateInputElement.value = "stupid";
const isStupid = testDateInputElement.value === "stupid";

export default function DatePicker({ date, setDate }) {
  if (isStupid) {
    return <AltDatePicker date={date} setDate={setDate} />;
  }
  const onDateInputChange = ({ target }) => setDate(target.value);
  return (
    <input
      type="date"
      value={date}
      max={todayISO}
      min="2019-01-01"
      onChange={onDateInputChange}
      id="date-input"
    />
  );
}
