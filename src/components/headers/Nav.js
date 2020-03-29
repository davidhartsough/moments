import React from "react";
import { NavLink } from "react-router-dom";
import { Calendar, Users, MapPin, Tag } from "react-feather";

export default function Nav() {
  return (
    <nav>
      <NavLink exact to="/" className="nav-link" activeClassName="active">
        <Calendar />
        <span className="nav-link-title">Moments</span>
      </NavLink>
      <NavLink to="/people" className="nav-link" activeClassName="active">
        <Users />
        <span className="nav-link-title">People</span>
      </NavLink>
      <NavLink to="/places" className="nav-link" activeClassName="active">
        <MapPin />
        <span className="nav-link-title">Places</span>
      </NavLink>
      <NavLink to="/activities" className="nav-link" activeClassName="active">
        <Tag />
        <span className="nav-link-title">Activities</span>
      </NavLink>
    </nav>
  );
}
