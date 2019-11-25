import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const date = new Date();
const currentMonthNumber = date.getMonth();
const currentYear = date.getFullYear();
const monthOptions = months
  .slice(0, currentMonthNumber + 1)
  .map((m, i) => ({
    value: `${currentYear}-${i + 1}`,
    label: `${m} ${currentYear}`
  }))
  .reverse();
for (let year = currentYear - 1; year >= 1922; year--) {
  for (let i = 11; i >= 0; i--) {
    monthOptions.push({
      value: `${year}-${i + 1}`,
      label: `${months[i]} ${year}`
    });
  }
}
const prevMonthBound = monthOptions.length - 1;

export default function MonthPicker({ updateMonth }) {
  const [monthIndex, setMonthIndex] = useState(0);
  const [month, setMonth] = useState(
    `0-${currentYear}-${currentMonthNumber + 1}`
  );
  const handleMonthChange = ({ target }) => {
    const { value } = target;
    setMonth(value);
    setMonthIndex(Number(value.slice(0, value.indexOf("-"))));
    updateMonth(value.slice(value.indexOf("-") + 1));
  };
  function goToPrevMonth() {
    const newMonthIndex = monthIndex + 1;
    setMonthIndex(newMonthIndex);
    const monthYear = monthOptions[newMonthIndex].value;
    setMonth(`${newMonthIndex}-${monthYear}`);
    updateMonth(monthYear);
  }
  function goToNextMonth() {
    const newMonthIndex = monthIndex - 1;
    setMonthIndex(newMonthIndex);
    const monthYear = monthOptions[newMonthIndex].value;
    setMonth(`${newMonthIndex}-${monthYear}`);
    updateMonth(monthYear);
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
          {monthOptions.map((mo, i) => (
            <option key={mo.value} value={`${i}-${mo.value}`}>
              {mo.label}
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
