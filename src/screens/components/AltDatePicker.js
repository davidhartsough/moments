import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "./AltDatePicker.css";

const convertToISO = d => d.toISOString().substring(0, 10);

export default function AltDatePicker({ date, before, after, setDate }) {
  const [day, setDay] = useState(date);
  function onDayChange(day) {
    const iso = convertToISO(day);
    console.log(iso);
    setDay(iso);
    setDate(iso);
  }
  return (
    <DayPickerInput
      value={day}
      dayPickerProps={{
        showOutsideDays: true,
        disabledDays: { before, after }
      }}
      onDayChange={onDayChange}
      format="YYYY-MM-DD"
    />
  );
}
