import React from "react";

export default function Label({ icon, label }) {
  return (
    <div className="label">
      {icon}
      <h3>{label}</h3>
    </div>
  );
}
