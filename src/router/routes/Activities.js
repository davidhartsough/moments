import React from "react";
import { connect } from "react-redux";
import { fetchActivities } from "../../store/actions/activities";
import ListTab from "../../components/list";

function Activities(props) {
  return <ListTab {...props} title="Activities" type="Activity" />;
}

const mapStateToProps = ({ activities: { loading, data } }) => ({
  loading,
  data
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchActivities())
});

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
