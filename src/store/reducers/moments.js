const initialState = {
  loading: true,
  month: null,
  momentsByMonth: [],
  query: "",
  queryType: "",
  momentsByQuery: [],
  momentToEdit: null
};

const isInMonth = ({ date }, { month }) => date.substr(0, 7) === month;

function getType(queryType) {
  switch (queryType) {
    case "activity":
      return "activities";
    case "person":
      return "people";
    case "place":
      return "places";
    default:
      return "";
  }
}
const isInQuery = (m, { query, queryType }) => {
  if (query === "" || queryType === "") return false;
  return m[getType(queryType)].includes(query);
};

export default function moments(state = initialState, action) {
  switch (action.type) {
    case "set_moments_loading": {
      const { loading } = action.payload;
      return {
        ...state,
        loading
      };
    }
    case "set_month": {
      const { month } = action.payload;
      return {
        ...state,
        month
      };
    }
    case "set_moments_by_month": {
      const { month, momentsByMonth } = action.payload;
      return {
        ...state,
        month,
        momentsByMonth,
        loading: false
      };
    }
    case "set_query": {
      const { query, queryType } = action.payload;
      return {
        ...state,
        query,
        queryType
      };
    }
    case "set_moments_by_query": {
      const { query, queryType, momentsByQuery } = action.payload;
      return {
        ...state,
        query,
        queryType,
        momentsByQuery,
        loading: false
      };
    }
    case "create_moment": {
      const { created } = action.payload;
      const momentsByMonth = [...state.momentsByMonth];
      const momentsByQuery = [...state.momentsByQuery];
      if (isInMonth(created, state)) momentsByMonth.push(created);
      if (isInQuery(created, state)) momentsByQuery.push(created);
      return {
        ...state,
        momentsByMonth,
        momentsByQuery,
        loading: false
      };
    }
    case "update_moment": {
      const { updated } = action.payload;
      const momentsByMonth = [...state.momentsByMonth];
      const momentsByQuery = [...state.momentsByQuery];
      if (isInMonth(updated, state)) {
        const index = momentsByMonth.findIndex(({ id }) => id === updated.id);
        momentsByMonth[index] = updated;
      }
      if (isInQuery(updated, state)) {
        const index = momentsByQuery.findIndex(({ id }) => id === updated.id);
        momentsByQuery[index] = updated;
      }
      return {
        ...state,
        momentsByMonth,
        momentsByQuery,
        loading: false
      };
    }
    case "delete_moment": {
      const { deleted } = action.payload;
      const momentsByMonth = [...state.momentsByMonth];
      const momentsByQuery = [...state.momentsByQuery];
      if (isInMonth(deleted, state)) {
        const index = momentsByMonth.findIndex(({ id }) => id === deleted.id);
        momentsByMonth.splice(index, 1);
      }
      if (isInQuery(deleted, state)) {
        const index = momentsByQuery.findIndex(({ id }) => id === deleted.id);
        momentsByQuery.splice(index, 1);
      }
      return {
        ...state,
        momentsByMonth,
        momentsByQuery,
        loading: false
      };
    }
    case "set_moment_to_edit": {
      const { momentToEdit } = action.payload;
      return {
        ...state,
        momentToEdit
      };
    }
    default:
      return state;
  }
}
