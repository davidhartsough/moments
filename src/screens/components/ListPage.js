import React, { useState, useEffect } from "react";
import Header from "./Header";
import List from "./List";
import Loader from "./Loader";
import { getDocs } from "../../store";

function DataList({ data, plural, singular }) {
  if (data === false) return <Loader />;
  if (!data) return <p className="empty">Sorry, no {plural} here yet.</p>;
  if (!data.length) {
    return (
      <p className="empty">
        No {plural} here yet. Add moments with {plural} to see them here.
      </p>
    );
  }
  return <List items={data} type={singular} />;
}

export default function ListPage({ plural, singular }) {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getDocs(plural).then(docs => {
      setData(docs);
      setIsLoading(false);
    });
  }, [plural]);
  return (
    <main>
      <Header title={plural} />
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <DataList data={data} plural={plural} singular={singular} />
        )}
      </section>
    </main>
  );
}
