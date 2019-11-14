import React from "react";
import "./Loader.css";

export default ({ size = 5, marginTop = "2rem" }) => (
  <div
    className="loader"
    style={{ width: `${size}rem`, height: `${size}rem`, marginTop }}
  />
);
