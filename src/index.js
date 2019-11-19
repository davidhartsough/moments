import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import initFirebase from "./fb";

initFirebase();

ReactDOM.render(<App />, document.getElementById("root"));

// serviceWorker.register();
