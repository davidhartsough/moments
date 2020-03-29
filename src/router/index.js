import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Calendar,
  Moments,
  NewMoment,
  EditMoment,
  Account,
  People,
  Places,
  Activities
} from "./routes";
import "./app.css";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Calendar />
      </Route>
      <Route path="/people">
        <People />
      </Route>
      <Route path="/places">
        <Places />
      </Route>
      <Route path="/activities">
        <Activities />
      </Route>
      <Route path="/moments">
        <Moments />
      </Route>
      <Route path="/edit/:id">
        <EditMoment />
      </Route>
      <Route path="/new">
        <NewMoment />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
    </Switch>
  </BrowserRouter>
);
