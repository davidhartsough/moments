import React from "react";
import qs from "query-string";
import { Link } from "react-router-dom";

export default ({ item, type }) => (
  <Link
    to={`/moments?${qs.stringify({ type, q: item.name })}`}
    className="list-item"
  >
    <p className="item-name">{item.name}</p>
    <p className="item-count">{item.count}</p>
  </Link>
);
