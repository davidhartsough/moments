import React from "react";
import List from "./List";

export default function ListPage({ title, type, data }) {
  const plural = title.toLowerCase();
  const singular = type.toLowerCase();
  if (data.length === 0) {
    return (
      <p className="empty">
        No {plural} here yet. Add moments with {plural} to see them here.
      </p>
    );
  }
  return <List singular={singular} type={type} plural={plural} items={data} />;
}
