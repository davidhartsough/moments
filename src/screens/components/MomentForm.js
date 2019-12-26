import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { getDocs, getMomentToEdit } from "../../store";
import { X, Calendar, Users, MapPin, Tag } from "react-feather";
import PageLoader from "./PageLoader";
import AltDatePicker from "./AltDatePicker";
import "./MomentForm.css";

const testDateInputElement = document.createElement("input");
testDateInputElement.type = "date";
testDateInputElement.value = "stupid";
const isStupid = testDateInputElement.value === "stupid";
function pad(num) {
  const norm = Math.floor(Math.abs(num));
  return (norm < 10 ? "0" : "") + norm;
}
const toISO = date =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const todayDate = new Date();
const today = toISO(todayDate);
const min = "1922-02-02";
const before = new Date(min);

const noOptionsMessage = () => null;
const isValidNewOption = inputValue => inputValue.length > 2;

function getOptions(docs) {
  return docs.map(doc => ({
    label: doc.name,
    value: doc.id
  }));
}

const selectStyles = {
  multiValue: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused ? "#d6ebff" : "#ededed",
    height: "22px"
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: "#000",
    fontSize: "0.875rem",
    lineHeight: "22px",
    padding: "0 1px",
    paddingLeft: "7px",
    paddingRight: "7px"
  })
};

const components = {
  DropdownIndicator: null,
  MultiValueRemove: () => null
};

function FormItem({ icon, handleChange, options, values, label }) {
  const [inputValue, setInputValue] = useState("");
  return (
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
          value={values}
          placeholder={`Add ${label}`}
          noOptionsMessage={noOptionsMessage}
          isValidNewOption={isValidNewOption}
          maxMenuHeight={160}
          isClearable={false}
          styles={selectStyles}
          components={components}
          menuIsOpen={inputValue.length > 1}
          blurInputOnSelect={false}
          inputValue={inputValue}
          onInputChange={setInputValue}
        />
      </div>
    </div>
  );
}

export default function MomentForm({ onSave, isEdit = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(today);
  const [people, setPeople] = useState(null);
  const [places, setPlaces] = useState(null);
  const [activities, setActivities] = useState(null);
  const [personOptions, setPersonOptions] = useState([]);
  const [placeOptions, setPlaceOptions] = useState([]);
  const [activityOptions, setActivityOptions] = useState([]);
  useEffect(() => {
    const promises = ["people", "places", "activities"].map(t => getDocs(t));
    Promise.all(promises)
      .then(tdocs => {
        setPersonOptions(getOptions(tdocs[0]));
        setPlaceOptions(getOptions(tdocs[1]));
        setActivityOptions(getOptions(tdocs[2]));
        if (isEdit) {
          const { moment, docs } = getMomentToEdit(true);
          setDate(moment.date);
          setPeople(getOptions(docs.people));
          setPlaces(getOptions(docs.places));
          setActivities(getOptions(docs.activities));
        }
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, [isEdit]);
  const onDateInputChange = ({ target }) => setDate(target.value);
  const handlePeopleChange = newValue => setPeople(newValue);
  const handlePlacesChange = newValue => setPlaces(newValue);
  const handleActivitiesChange = newValue => setActivities(newValue);
  function save() {
    setIsLoading(true);
    onSave(date, people, places, activities);
  }
  const title = `${isEdit ? "Edit" : "New"} Moment`;
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
            {isStupid ? (
              <AltDatePicker
                date={date}
                after={todayDate}
                before={before}
                setDate={setDate}
              />
            ) : (
              <input
                type="date"
                value={date}
                max={today}
                min={min}
                onChange={onDateInputChange}
                id="date-input"
              />
            )}
          </div>
          <FormItem
            icon={<Users size={20} className="label-icon" />}
            label="people"
            handleChange={handlePeopleChange}
            options={personOptions}
            values={people}
          />
          <FormItem
            icon={<MapPin size={20} className="label-icon" />}
            label="places"
            handleChange={handlePlacesChange}
            options={placeOptions}
            values={places}
          />
          <FormItem
            icon={<Tag size={20} className="label-icon" />}
            label="activities"
            handleChange={handleActivitiesChange}
            options={activityOptions}
            values={activities}
          />
        </div>
      </section>
      <footer>
        <button
          onClick={save}
          className="primary-action save"
          disabled={!date || (!people && !places && !activities)}
        >
          Save
        </button>
      </footer>
    </main>
  );
}
