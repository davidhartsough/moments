import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Calendar, Users, MapPin, Tag } from "react-feather";
import DatePicker from "./DatePicker";
import Label from "./Label";
import FormItem from "./FormItem";
import Loader from "../loaders/Loader";
import { todayISO } from "../../date-utils";

const emptyMoment = {
  id: null,
  date: null,
  people: [],
  places: [],
  activities: []
};
function getOptions(i) {
  return i.map(({ id, name }) => ({
    label: name,
    value: id
  }));
}
function getUpperCaseOptions(i) {
  return i.map(({ name }) => name.toUpperCase());
}
// const getOptions = ({ data }) => data.map(({ name }) => name);

function Form({
  onSave,
  initialMoment = emptyMoment,
  _people,
  _places,
  _activities
}) {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(initialMoment.date || todayISO);
  const [people, setPeople] = useState([]);
  const [places, setPlaces] = useState([]);
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    if (
      initialMoment.id !== null &&
      !_people.loading &&
      !_places.loading &&
      !_activities.loading
    ) {
      setPeople(
        getOptions(
          initialMoment.people.map(p =>
            _people.data.find(({ name }) => name === p)
          )
        )
      );
      setPlaces(
        getOptions(
          initialMoment.places.map(p =>
            _places.data.find(({ name }) => name === p)
          )
        )
      );
      setActivities(
        getOptions(
          initialMoment.activities.map(a =>
            _activities.data.find(({ name }) => name === a)
          )
        )
      );
      setLoading(false);
    }
    if (initialMoment.id === null) {
      setLoading(false);
    }
  }, [initialMoment, _people, _places, _activities]);
  if (loading || _people.loading || _places.loading || _activities.loading) {
    return <Loader />;
  }
  function save() {
    if (loading) return;
    setLoading(true);
    const { id } = initialMoment;
    const momentData = {
      date,
      people,
      places,
      activities
    };
    const newMoment = id ? { id, ...momentData } : momentData;
    onSave(newMoment, initialMoment);
  }
  return (
    <>
      <div className="form">
        <div className="form-group">
          <Label
            label="Date"
            icon={<Calendar size={20} className="label-icon" />}
          />
          <DatePicker date={date} setDate={setDate} />
        </div>
        <FormItem
          icon={<Users size={20} className="label-icon" />}
          label="people"
          setValues={setPeople}
          options={getOptions(_people.data)}
          upperCaseOptions={getUpperCaseOptions(_people.data)}
          values={people}
        />
        <FormItem
          icon={<MapPin size={20} className="label-icon" />}
          label="places"
          setValues={setPlaces}
          options={getOptions(_places.data)}
          upperCaseOptions={getUpperCaseOptions(_places.data)}
          values={places}
        />
        <FormItem
          icon={<Tag size={20} className="label-icon" />}
          label="activities"
          setValues={setActivities}
          options={getOptions(_activities.data)}
          upperCaseOptions={getUpperCaseOptions(_activities.data)}
          values={activities}
        />
      </div>
      <footer>
        <button
          onClick={save}
          className="primary-action save"
          disabled={
            !date || (!people.length && !places.length && !activities.length)
          }
        >
          Save
        </button>
      </footer>
    </>
  );
}

const mapStateToProps = ({ people, places, activities }) => ({
  _people: people,
  _places: places,
  _activities: activities
});

export default connect(mapStateToProps)(Form);
