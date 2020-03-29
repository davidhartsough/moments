import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Label from "./Label";
const noOptionsMessage = () => null;
const isValidNewOption = inputValue => inputValue.length > 2;

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

export default function FormItem({ icon, setValues, options, values, label }) {
  const [inputValue, setInputValue] = useState("");
  const onChange = newValue => setValues(newValue || []);
  return (
    <div className="form-group">
      <Label icon={icon} label={label} />
      <div className="input">
        <CreatableSelect
          isMulti
          onChange={onChange}
          options={options}
          value={values}
          placeholder={`Add ${label}`}
          noOptionsMessage={noOptionsMessage}
          isValidNewOption={isValidNewOption}
          maxMenuHeight={160}
          isClearable={false}
          styles={selectStyles}
          components={components}
          menuIsOpen={inputValue.length > 0}
          blurInputOnSelect={false}
          inputValue={inputValue}
          onInputChange={setInputValue}
        />
      </div>
    </div>
  );
}
