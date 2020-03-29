import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "react-feather";

export default function ActionButton() {
  return (
    <footer className="main-footer">
      <Link to="/new" className="primary-action" id="add-new">
        <Plus size={18} />
        <span className="primary-action-text">New</span>
      </Link>
    </footer>
  );
}
