import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { Link, useHistory } from "react-router-dom";
import { saveNewMoment, getDocs } from "../store";
import { X, Calendar, Users, MapPin, Tag } from "react-feather";
import PageLoader from "./components/PageLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NewMoment.css";

const noOptionsMessage = () => null;
const isValidNewOption = inputValue => inputValue.length > 2;
const today = new Date();
const minDate = new Date("1920-01-02");

function getOptions(docs) {
  return docs.map(doc => ({
    label: doc.name,
    value: doc.id
  }));
}

const FormItem = ({ icon, handleChange, options, label }) => (
  <div className="form-group">
    <div className="label">
      {icon}
      <h3>{label}</h3>
    </div>
    <div className="input">
      <CreatableSelect
        isMulti
        onChange={handleChange}
        options={options}
        placeholder={`Add ${label}`}
        noOptionsMessage={noOptionsMessage}
        isValidNewOption={isValidNewOption}
        maxMenuHeight={160}
        isClearable={false}
      />
    </div>
  </div>
);

export default function NewMoment() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(today);
  const [people, setPeople] = useState(null);
  const [places, setPlaces] = useState(null);
  const [activities, setActivities] = useState(null);
  const [personOptions, setPersonOptions] = useState([]);
  const [placeOptions, setPlaceOptions] = useState([]);
  const [activityOptions, setActivityOptions] = useState([]);
  useEffect(() => {
    getDocs("people").then(docs => setPersonOptions(getOptions(docs)));
    getDocs("places").then(docs => setPlaceOptions(getOptions(docs)));
    getDocs("activities").then(docs => setActivityOptions(getOptions(docs)));
  }, []);
  const onDateChange = dateInput => setDate(dateInput);
  const handlePeopleChange = newValue => setPeople(newValue);
  const handlePlacesChange = newValue => setPlaces(newValue);
  const handleActivitiesChange = newValue => setActivities(newValue);
  function addNewMoment() {
    setIsLoading(true);
    saveNewMoment(date, people, places, activities).then(() =>
      history.push("/")
    );
  }
  if (isLoading) return <PageLoader title="New Moment" />;
  return (
    <main>
      <header>
        <h1>New Moment</h1>
        <Link to="/" className="header-link">
          <X />
        </Link>
      </header>
      <section>
        <div className="form">
          <div>
            <div className="label">
              <Calendar size={20} className="label-icon" />
              <h3>Date</h3>
            </div>
            <DatePicker
              selected={date}
              onChange={onDateChange}
              placeholderText="Select a date"
              maxDate={today}
              minDate={minDate}
              className="date-picker-input"
            />
          </div>
          <FormItem
            icon={<Users size={20} className="label-icon" />}
            label="people"
            handleChange={handlePeopleChange}
            options={personOptions}
          />
          <FormItem
            icon={<MapPin size={20} className="label-icon" />}
            label="places"
            handleChange={handlePlacesChange}
            options={placeOptions}
          />
          <FormItem
            icon={<Tag size={20} className="label-icon" />}
            label="activities"
            handleChange={handleActivitiesChange}
            options={activityOptions}
          />
        </div>
      </section>
      <footer>
        <button
          onClick={addNewMoment}
          className="primary-action save"
          disabled={people === null && places === null && activities === null}
        >
          Save
        </button>
      </footer>
    </main>
  );
}
