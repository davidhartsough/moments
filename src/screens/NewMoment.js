import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useHistory } from "react-router-dom";
import { X, Check, Calendar, Users, MapPin, Tag } from "react-feather";

const personOptions = [];
const placeOptions = [];
const tagOptions = [];

export default function NewMoment() {
  const history = useHistory();
  const close = () => history.goBack();
  const [date, setDate] = useState(null);
  const [people, setPeople] = useState(null);
  const [places, setPlaces] = useState(null);
  const [tags, setTags] = useState(null);
  const handlePeopleChange = newValue => setPeople(newValue);
  const handlePlacesChange = newValue => setPlaces(newValue);
  const handleTagsChange = newValue => setTags(newValue);
  function addNewMoment() {
    console.group("savin' data...");
    console.log("date: ", date);
    console.log("people: ", people);
    console.log("places: ", places);
    console.log("tags: ", tags);
    console.groupEnd();
  }
  return (
    <main>
      <header>
        <h1>New Moment</h1>
        <button onClick={close}>
          <X />
        </button>
      </header>
      <section>
        <div className="form-group">
          <div className="label">
            <Users />
            <h3>People</h3>
          </div>
          <div className="input">
            <CreatableSelect
              isMulti
              onChange={handlePeopleChange}
              options={personOptions}
              placeholder="Add people"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="label">
            <MapPin />
            <h3>Places</h3>
          </div>
          <div className="input">
            <CreatableSelect
              isMulti
              onChange={handlePlacesChange}
              options={placeOptions}
              placeholder="Add places"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="label">
            <Tag />
            <h3>Activities</h3>
          </div>
          <div className="input">
            <CreatableSelect
              isMulti
              onChange={handleTagsChange}
              options={tagOptions}
              placeholder="Add activities"
            />
          </div>
        </div>
      </section>
      <footer>
        <button onClick={addNewMoment}>
          <Check /> Save
        </button>
      </footer>
    </main>
  );
}
