import React, { useState, useEffect } from "react";
import Header from "./Header";
import List from "./List";

function DataList({ data, plural, singular }) {
  if (data === false) {
    return <p>Loading bud.</p>;
  }
  if (!data.length) {
    return (
      <p>
        No {plural} here yet. Add moments with {plural} to see them here.
      </p>
    );
  }
  return <List items={data} type={singular} />;
}

export default function ListPage({ plural, singular }) {
  const [data, setData] = useState(false);
  useEffect(() => {
    /*
    CREATE an abstraction... db.get(plural)
    // if (shouldFetch[plural]) { ... }
    db.collection(plural)
      .orderBy("name")
      .get()
      .then(qss => setData(qss.docs))
      .catch(err => console.error("Error getting documents: ", err));
    */
    setData([]);
  }, []);
  return (
    <main>
      <Header title={plural} />
      <section>
        <DataList data={data} plural={plural} singular={singular} />
      </section>
    </main>
  );
}
