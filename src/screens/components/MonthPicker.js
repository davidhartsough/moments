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
const currentMonthNumber = date.getMonth() + 1;
const currentYear = date.getFullYear();
const getMM = mn => (mn < 10 ? `0${mn}` : mn);
const monthOptions = months
  .slice(0, currentMonthNumber)
  .map((m, i) => ({
    value: `${currentYear}-${getMM(i + 1)}`,
    label: `${m} ${currentYear}`
  }))
  .reverse();
for (let year = currentYear - 1; year >= 1922; year--) {
  for (let i = 11; i >= 0; i--) {
    monthOptions.push({
      value: `${year}-${getMM(i + 1)}`,
      label: `${months[i]} ${year}`
    });
  }
}
const prevMonthBound = monthOptions.length - 1;
const currentMonth = getMM(currentMonthNumber);

export default function MonthPicker({ updateMonth }) {
  const [monthIndex, setMonthIndex] = useState(0);
  const [month, setMonth] = useState(`0-${currentYear}-${currentMonth}`);
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
