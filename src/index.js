import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import configureServiceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

configureServiceWorker();
