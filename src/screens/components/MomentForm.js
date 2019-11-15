import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { getDocs } from "../../store";
import { X, Calendar, Users, MapPin, Tag } from "react-feather";
import PageLoader from "./PageLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MomentForm.css";

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

const selectStyles = {
  multiValue: styles => ({
    ...styles,
    backgroundColor: "#ededed",
    height: "22px"
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: "#000",
    fontSize: "0.875rem",
    lineHeight: "22px",
    padding: "0 1px",
    paddingLeft: "7px"
  })
};

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
        styles={selectStyles}
      />
    </div>
  </div>
);

export default function MomentForm({ title, onSave, moment }) {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(moment ? new Date(moment.date) : today);
  const [people, setPeople] = useState(moment ? moment.people : null);
  const [places, setPlaces] = useState(moment ? moment.places : null);
  const [activities, setActivities] = useState(
    moment ? moment.activities : null
  );
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
  function save() {
    setIsLoading(true);
    onSave(date, people, places, activities);
  }
  if (isLoading) return <PageLoader title={title} />;
  return (
    <main>
      <header>
        <h1>{title}</h1>
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
          onClick={save}
          className="primary-action save"
          disabled={people === null && places === null && activities === null}
        >
          Save
        </button>
      </footer>
    </main>
  );
}
