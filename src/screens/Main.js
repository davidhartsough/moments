import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CalendarScreen from "./Calendar";
import MomentsScreen from "./Moments";
import NewMomentScreen from "./NewMoment";
import AccountScreen from "./Account";
import ListPage from "./components/ListPage";
import EditMomentScreen from "./EditMoment";
import "./Main.css";

export default ({ signOut }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <CalendarScreen />
      </Route>
      <Route path="/people">
        <ListPage plural="people" singular="person" />
      </Route>
      <Route path="/places">
        <ListPage plural="places" singular="place" />
      </Route>
      <Route path="/activities">
        <ListPage plural="activities" singular="activity" />
      </Route>
      <Route path="/moments">
        <MomentsScreen />
      </Route>
      <Route path="/edit">
        <EditMomentScreen />
      </Route>
      <Route path="/new">
        <NewMomentScreen />
      </Route>
      <Route path="/account">
        <AccountScreen signOut={signOut} />
      </Route>
    </Switch>
  </BrowserRouter>
);
