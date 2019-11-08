import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, ChevronLeft, ChevronRight } from "react-feather";
import Header from "./components/Header";
import Moment from "./components/Moment";

/*
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
*/
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
const years = [];
let y = currentYear;
while (y !== 1920) {
  years.push(y);
  y--;
}

export default function Calendar() {
  const [moments, setMoments] = useState(false);
  const [month, setMonth] = useState(currentMonthNumber);
  const [year, setYear] = useState(currentYear);
  useEffect(() => {
    /*
    db.collection("moments")
      .where("month", "==", `${year}-${month}`)
      .orderBy("month")
      .get()
      .then(qss => setMoments(qss.docs))
      .catch(e => console.error("Error getting documents: ", e));
    */
    console.log(`where("month", "==", "${year}-${month}")`);
    setMoments([]);
  }, [month, year]);
  const handleMonthChange = ({ target }) => setMonth(target.value);
  const handleYearChange = ({ target }) => setYear(target.value);
  const monthOptions =
    year === currentYear ? months.slice(0, currentMonthNumber + 1) : months;
  const canGoToPrevMonth = !(month === 0 && year === 1920);
  const canGoToNextMonth = !(
    month === currentMonthNumber && year === currentYear
  );
  function goToPrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }
  function goToNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }
  if (moments === false) {
    return (
      <main>
        <Header title="Moments" />
        <section>
          <p>Loading...</p>
        </section>
      </main>
    );
  }
  return (
    <main>
      <Header title="Moments" />
      <section>
        <div className="month-picker">
          {canGoToPrevMonth && (
            <div onClick={goToPrevMonth} className="month-nav">
              <ChevronLeft />
            </div>
          )}
          <div className="selects">
            <select value={month} onChange={handleMonthChange}>
              {monthOptions.map((mo, i) => (
                <option key={`mo-${mo}-${i}`} value={i}>
                  {mo}
                </option>
              ))}
            </select>
            <select value={year} onChange={handleYearChange}>
              {years.map(yo => (
                <option key={`yo-${yo}`}>{yo}</option>
              ))}
            </select>
          </div>
          {canGoToNextMonth && (
            <div onClick={goToNextMonth} className="month-nav">
              <ChevronRight />
            </div>
          )}
        </div>
        {moments.length > 0 ? (
          moments.map(m => <Moment key={m.id} moment={m.data()} />)
        ) : (
          <p>No moments found for this month.</p>
        )}
      </section>
      <footer className="main-footer">
        <Link to="/new" className="primary-action" id="add-new">
          <Plus size={18} />
          <span className="primary-action-text">New</span>
        </Link>
      </footer>
    </main>
  );
}
