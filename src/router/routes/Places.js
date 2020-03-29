import React from "react";
import { connect } from "react-redux";
import { fetchPlaces } from "../../store/actions/places";
import ListTab from "../../components/list";

function Places(props) {
  return <ListTab {...props} title="Places" type="Place" />;
}

const mapStateToProps = ({ places: { loading, data } }) => ({
  loading,
  data
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchPlaces())
});

export default connect(mapStateToProps, mapDispatchToProps)(Places);
