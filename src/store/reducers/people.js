const initialState = {
  loading: true,
  hasFetched: false,
  data: []
};

export default function people(state = initialState, action) {
  switch (action.type) {
    case "set_people_loading": {
      const { loading } = action.payload;
      return {
        ...state,
        loading
      };
    }
    case "get_people": {
      const { data } = action.payload;
      return {
        data,
        hasFetched: true,
        loading: false
      };
    }
    case "create_person": {
      const { created } = action.payload;
      const data = [...state.data];
      data.push(created);
      return {
        ...state,
        data,
        loading: false
      };
    }
    case "increment_person_count": {
      const { id } = action.payload;
      const data = [...state.data];
      const index = data.findIndex(i => i.id === id);
      const person = data[index];
      person.count += 1;
      data[index] = person;
      return {
        ...state,
        data,
        loading: false
      };
    }
    case "decrement_person_count": {
      const { id } = action.payload;
      const data = [...state.data];
      const index = data.findIndex(i => i.id === id);
      const person = data[index];
      person.count = person.count - 1;
      if (person.count === 0) {
        data.splice(index, 1);
      } else {
        data[index] = person;
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
