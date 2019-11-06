import React, { useState, useEffect } from "react";
import qs from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import Moment from "./components/Moment";
import { ArrowLeft } from "react-feather";

function Page({ children }) {
  const history = useHistory();
  const goBack = () => history.goBack();
  return (
    <main>
      <header>
        <button onClick={goBack}>
          <ArrowLeft />
        </button>
        <h1>Moments</h1>
      </header>
      <section>{children}</section>
    </main>
  );
}

function MomentList({ type, q }) {
  const [moments, setMoments] = useState(false);
  useEffect(() => {
    /*
    db.collection("moments")
      .where(type, "array-contains", query.q)
      .orderBy(type)
      .get()
      .then(qss => setMoments(qss.docs))
      .catch(err => console.error("Error getting documents: ", err));
    */
    console.log(`where(${type}, "array-contains", ${q})`);
    setMoments([]);
  }, [type, q]);
  if (moments === false) {
    return <p>Loading bud.</p>;
  }
  if (!moments.length) {
    return (
      <p>
        No moments found for the {type} named "{q}".
      </p>
    );
  }
  return moments.map(m => <Moment key={m.id} moment={m.data()} />);
}

export default function Moments() {
  const location = useLocation();
  const query = qs.parse(location.search);
  if (!query.hasOwnProperty("type") || !query.hasOwnProperty("q")) {
    return (
      <Page>
        <h2>Sorry, no search results.</h2>
      </Page>
    );
  }
  return (
    <Page>
      <MomentList type={query.type.toLowerCase()} q={query.q} />
    </Page>
  );
}
