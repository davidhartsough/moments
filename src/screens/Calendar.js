import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "react-feather";
import PageLoader from "./components/PageLoader";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Moment from "./components/Moment";
import MonthPicker from "./components/MonthPicker";
import { getMomentsByMonth } from "../store";
import "./Calendar.css";

const options = {
  timeZone: "UTC",
  weekday: "long",
  month: "short",
  day: "numeric"
};
function getDayString(date) {
  return new Date(date).toLocaleDateString(undefined, options);
}

const Day = ({ day, moments }) => (
  <div className="day">
    <div className="day-header">
      <hr className="day-divider" />
      <h3 className="day-title">{getDayString(day)}</h3>
    </div>
    {moments.map(m => (
      <Moment key={m.id} id={m.id} moment={m.data()} showDate={false} />
    ))}
  </div>
);

function MomentsByDay({ moments }) {
  const days = {};
  moments.forEach(m => {
    if (Array.isArray(days[m.data().date])) {
      days[m.data().date].push(m);
    } else {
      days[m.data().date] = [m];
    }
  });
  return Object.entries(days).map(day => (
    <Day day={day[0]} key={day[0]} moments={day[1]} />
  ));
}

const date = new Date();
const currentMonthNumber = date.getMonth() + 1;
const currentYear = date.getFullYear();

export default function Calendar() {
  const [isLoading, setIsLoading] = useState(true);
  const [moments, setMoments] = useState(false);
  const [month, setMonth] = useState(`${currentYear}-${currentMonthNumber}`);
  useEffect(() => {
    setIsLoading(true);
    getMomentsByMonth(month).then(result => {
      setMoments(result);
      setIsLoading(false);
    });
  }, [month]);
  if (moments === false) return <PageLoader title="Moments" />;
  return (
    <main>
      <Header title="Moments" />
      <section>
        <MonthPicker updateMonth={setMonth} />
        <div className="month-list">
          {isLoading ? (
            <Loader />
          ) : moments.length > 0 ? (
            <MomentsByDay moments={moments} />
          ) : (
            <p className="empty">No moments found for this month.</p>
          )}
        </div>
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
