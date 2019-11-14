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
            moments.map(m => <Moment key={m.id} moment={m.data()} />)
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
