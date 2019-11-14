import React, { useState, useEffect } from "react";
import qs from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import Loader from "./components/Loader";
import Moment from "./components/Moment";
import { getMomentsByQuery } from "../store";

function Page({ children }) {
  const history = useHistory();
  const goBack = () => history.goBack();
  return (
    <main>
      <header>
        <button onClick={goBack} className="go-back">
          <ArrowLeft />
        </button>
        <h1 style={{ flex: "1 1 auto" }}>Moments</h1>
      </header>
      <section>{children}</section>
    </main>
  );
}

function MomentList({ type, q }) {
  const [moments, setMoments] = useState(false);
  useEffect(() => {
    getMomentsByQuery(type, q).then(result => setMoments(result));
  }, [type, q]);
  if (moments === false) return <Loader />;
  if (!moments.length) {
    return (
      <p className="empty">
        No moments found for the {type} named "{q}".
      </p>
    );
  }
  return (
    <>
      <h2>
        {moments.length} result{moments.length > 1 && "s"} for: "{q}"
      </h2>
      {moments.map(m => (
        <Moment key={m.id} moment={m.data()} />
      ))}
    </>
  );
}

export default function Moments() {
  const location = useLocation();
  const query = qs.parse(location.search);
  return (
    <Page>
      {query.type === undefined || query.q === undefined ? (
        <p className="empty">Sorry, no search results. Try again.</p>
      ) : (
        <MomentList type={query.type.toLowerCase()} q={query.q} />
      )}
    </Page>
  );
}
