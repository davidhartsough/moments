import React, { useState } from "react";
import { ArrowDown, ArrowUp, Search } from "react-feather";
import ListItem from "./ListItem";
import "./List.css";

const compareCount = (a, b) => b.count - a.count;
const compareCountDesc = (a, b) => a.count - b.count;
function compareName(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
function compareNameDesc(a, b) {
  if (a.name < b.name) return 1;
  if (a.name > b.name) return -1;
  return 0;
}

export default function List({ singular, type, plural, items }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("count");
  const [ascending, setAscending] = useState(true);
  function sortByName() {
    if (sort === "name") {
      setAscending(!ascending);
    } else {
      setSort("name");
      setAscending(true);
    }
  }
  function sortByCount() {
    if (sort === "count") {
      setAscending(!ascending);
    } else {
      setSort("count");
      setAscending(true);
    }
  }
  const handleSearch = ({ target }) => setSearch(target.value);
  const query = search.trim().toUpperCase();
  let listItems = items;
  listItems = listItems.filter(({ count }) => count > 0);
  if (query.length > 0) {
    listItems = items.filter(({ name }) => name.toUpperCase().includes(query));
  }
  if (listItems.length) {
    const sortComparison =
      sort === "name"
        ? ascending
          ? compareName
          : compareNameDesc
        : ascending
        ? compareCount
        : compareCountDesc;
    listItems = listItems.sort(sortComparison);
  }

  return (
    <>
      <div className="search-bar">
        <div className="icon-prefix">
          <Search size={20} />
        </div>
        <input
          type="search"
          placeholder="Search"
          id="search-input"
          maxLength="120"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="table">
        <div className="sorting">
          <div className="sort-item" onClick={sortByName}>
            <span className="sort-item-text">{type}</span>
            {sort === "name" ? (
              ascending ? (
                <ArrowUp size={18} className="sort-item-icon" />
              ) : (
                <ArrowDown size={18} className="sort-item-icon" />
              )
            ) : null}
          </div>
          <div className="sort-item" onClick={sortByCount}>
            {sort === "count" ? (
              ascending ? (
                <ArrowUp size={18} className="sort-item-icon" />
              ) : (
                <ArrowDown size={18} className="sort-item-icon" />
              )
            ) : null}
            <span className="sort-item-text">Moments</span>
          </div>
        </div>
        <div className="list">
          {listItems.length ? (
            listItems.map((i, index) => (
              <ListItem
                key={`${i.name.replace(/ /gi, "-")}-${i.count}-${index}`}
                type={singular}
                item={i}
              />
            ))
          ) : (
            <p className="no-results">No {plural} found for that search.</p>
          )}
        </div>
      </div>
    </>
  );
}
