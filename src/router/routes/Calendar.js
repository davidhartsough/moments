import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TabsHeader from "../../components/headers/TabsHeader";
import ActionButton from "../../components/calendar/ActionButton";
import MonthPicker from "../../components/calendar/MonthPicker";
import Month from "../../components/calendar/Month";
import { fetchMomentsByMonth } from "../../store/actions/moments";
import { currentYearAndMonth } from "../../date-utils";
import "./Calendar.css";

function Calendar({ moments, _getMoments }) {
  const [month, setMonth] = useState(currentYearAndMonth);
  useEffect(() => {
    _getMoments(month);
  }, [_getMoments, month]);
  return (
    <main>
      <TabsHeader title="Moments" />
      <section>
        <MonthPicker month={month} setMonth={setMonth} />
        <div className="month-list">
          <Month moments={moments} />
        </div>
      </section>
      <ActionButton />
    </main>
  );
}

const mapDispatchToProps = dispatch => ({
  _getMoments: month => dispatch(fetchMomentsByMonth(month))
});

export default connect(
  ({ moments }) => ({ moments }),
  mapDispatchToProps
)(Calendar);
