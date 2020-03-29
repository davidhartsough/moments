const initialState = {
  loading: true,
  hasFetched: false,
  data: []
};

export default function activities(state = initialState, action) {
  switch (action.type) {
    case "set_activities_loading": {
      const { loading } = action.payload;
      return {
        ...state,
        loading
      };
    }
    case "get_activities": {
      const { data } = action.payload;
      return {
        data,
        hasFetched: true,
        loading: false
      };
    }
    case "create_activity": {
      const { created } = action.payload;
      const data = [...state.data];
      data.push(created);
      return {
        ...state,
        data,
        loading: false
      };
    }
    case "increment_activity_count": {
      const { id } = action.payload;
      const data = [...state.data];
      const index = data.findIndex(i => i.id === id);
      const activity = data[index];
      activity.count += 1;
      data[index] = activity;
      return {
        ...state,
        data,
        loading: false
      };
    }
    case "decrement_activity_count": {
      const { id } = action.payload;
      const data = [...state.data];
      const index = data.findIndex(i => i.id === id);
      const activity = data[index];
      activity.count = activity.count - 1;
      if (activity.count === 0) {
        data.splice(index, 1);
      } else {
        data[index] = activity;
      }
      return {
        ...state,
        data,
        loading: false
      };
    }
    default:
      return state;
  }
}
