import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "./AltDatePicker.css";

const convertToISO = d => d.toISOString().substring(0, 10);

export default function AltDatePicker({ date, setDate }) {
  const [day, setDay] = useState(date);
  function onDayChange(day) {
    const iso = convertToISO(day);
    setDay(iso);
    setDate(iso);
  }
  return (
    <DayPickerInput
      value={day}
      dayPickerProps={{
        showOutsideDays: true,
        disabledDays: {
          before: new Date(2019, 1, 1),
          after: new Date()
        }
      }}
      onDayChange={onDayChange}
      format="YYYY-MM-DD"
    />
  );
}
