import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { fetchMomentsByQuery } from "../../store/actions/moments";
import Loader from "../../components/loaders/Loader";
import Moment from "../../components/Moment";
import HeaderWithBack from "../../components/headers/HeaderWithBack";

function sortByDate(a, b) {
  if (a.date > b.date) {
    return -1;
  } else if (a.date < b.date) {
    return 1;
  } else {
    return 0;
  }
}

function getPreposition(type) {
  switch (type) {
    case "person":
      return "with";
    case "place":
      return "at";
    case "activity":
      return "matching";
    default:
      return;
  }
}

function Moments({ type, q, moments, _getMoments }) {
  useEffect(() => {
    _getMoments(q, type);
  }, [type, q, _getMoments]);
  if (moments.loading) return <Loader />;
  if (moments.momentsByQuery.length < 1) {
    return (
      <p className="empty">
        No moments found for the {type} named "{q}"
      </p>
    );
  }
  const items = [...moments.momentsByQuery].sort(sortByDate);
  return (
    <>
      <h2>
        {items.length} moment{items.length > 1 && "s"} {getPreposition(type)}: "
        {q}"
      </h2>
      {items.map(m => (
        <Moment key={m.id} moment={m} showDate={true} />
      ))}
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  _getMoments: (query, type) => dispatch(fetchMomentsByQuery(query, type))
});

const Enhanced = connect(
  ({ moments }) => ({ moments }),
  mapDispatchToProps
)(Moments);

export default function() {
  const location = useLocation();
  const query = qs.parse(location.search);
  return (
    <main>
      <HeaderWithBack title="Moments" />
      <section>
        {query.type === undefined || query.q === undefined ? (
          <p className="empty">Sorry, no search results. Try again.</p>
        ) : (
          <Enhanced type={query.type} q={query.q} />
        )}
      </section>
    </main>
  );
}
