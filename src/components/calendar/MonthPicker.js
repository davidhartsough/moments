import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { monthOptions, prevMonthBound } from "../../date-utils";

export default function MonthPicker({ month, setMonth }) {
  const [monthIndex, setMonthIndex] = useState(0);
  function handleMonthChange({ target }) {
    const { value } = target;
    setMonth(value);
    setMonthIndex(monthOptions.findIndex(m => m.value === value));
  }
  function goToPrevMonth() {
    const newMonthIndex = monthIndex + 1;
    setMonthIndex(newMonthIndex);
    const newMonth = monthOptions[newMonthIndex].value;
    setMonth(newMonth);
  }
  function goToNextMonth() {
    const newMonthIndex = monthIndex - 1;
    setMonthIndex(newMonthIndex);
    const newMonth = monthOptions[newMonthIndex].value;
    setMonth(newMonth);
  }
  return (
    <div className="month-picker">
      {monthIndex !== prevMonthBound ? (
        <div onClick={goToPrevMonth} className="month-nav">
          <ChevronLeft />
        </div>
      ) : (
        <div className="month-nav disabled">
          <ChevronLeft />
        </div>
      )}
      <div className="selects">
        <select value={month} onChange={handleMonthChange}>
          {monthOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {monthIndex !== 0 ? (
        <div onClick={goToNextMonth} className="month-nav">
          <ChevronRight />
        </div>
      ) : (
        <div className="month-nav disabled">
          <ChevronRight />
        </div>
      )}
    </div>
  );
}
