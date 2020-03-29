const initialState = {
  loading: true,
  hasFetched: false,
  data: []
};

export default function places(state = initialState, action) {
  switch (action.type) {
    case "set_places_loading": {
      const { loading } = action.payload;
      return {
        ...state,
        loading
      };
    }
    case "get_places": {
      const { data } = action.payload;
      return {
        data,
        hasFetched: true,
        loading: false
      };
    }
    case "create_place": {
      const { created } = action.payload;
      const data = [...state.data];
      data.push(created);
      return {
        ...state,
        data,
        loading: false
      };
    }
    case "increment_place_count": {
      const { id } = action.payload;
      const data = [...state.data];
      const index = data.findIndex(i => i.id === id);
      const place = data[index];
      place.count += 1;
      data[index] = place;
      return {
        ...state,
        data,
        loading: false
      };
    }
    case "decrement_place_count": {
      const { id } = action.payload;
      const data = [...state.data];
      const index = data.findIndex(i => i.id === id);
      const place = data[index];
      place.count = place.count - 1;
      if (place.count === 0) {
        data.splice(index, 1);
      } else {
        data[index] = place;
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
