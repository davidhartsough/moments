import React from "react";
import { Link, NavLink } from "react-router-dom";
import { User, Calendar, Users, MapPin, Tag } from "react-feather";

export default ({ title }) => (
  <>
    <header>
      <h1>Amazing {title}</h1>
      <Link to="/account">
        <User />
      </Link>
    </header>
    <nav>
      <NavLink to="/calendar">
        <Calendar />
        Moments
      </NavLink>
      <NavLink to="/people">
        <Users />
        People
      </NavLink>
      <NavLink to="/places">
        <MapPin />
        Places
      </NavLink>
      <NavLink to="/activities">
        <Tag />
        Activities
      </NavLink>
    </nav>
  </>
);
