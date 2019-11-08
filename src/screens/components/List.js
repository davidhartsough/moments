import React, { useState } from "react";
import ListItem from "./ListItem";
import { ArrowDown, ArrowUp, Search } from "react-feather";

const compareCount = (a, b) => a.count - b.count;
function compareName(a, b) {
  if (a.upperCase < b.upperCase) {
    return -1;
  }
  if (a.upperCase > b.upperCase) {
    return 1;
  }
  return 0;
}

export default function List({ items, type }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
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
      setAscending(false);
    }
  }

  function handleSearch({ target }) {
    setSearch(target.value);
  }

  const query = search.trim().toUpperCase;
  const filteredItems =
    query.length > 1
      ? items.filter(p => p.nameUpperCase.includes(query))
      : items;
  const sortedItems =
    sort === "name"
      ? filteredItems.sort(compareName)
      : filteredItems.sort(compareCount);
  const itemList = sortedItems.map(i => (
    <ListItem key={i.id} type={type} item={i} />
  ));

  return (
    <section>
      <div className="search-bar">
        <div className="icon-prefix">
          <Search />
        </div>
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          maxLength="120"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="sorting">
        <div className="sort-item" onClick={sortByName}>
          <span>{type}</span>
          {sort === "name" ? ascending ? <ArrowUp /> : <ArrowDown /> : null}
        </div>
        <div className="sort-item" onClick={sortByCount}>
          <span>Moments</span>
          {sort === "count" ? ascending ? <ArrowUp /> : <ArrowDown /> : null}
        </div>
      </div>
      {itemList}
    </section>
  );
}
