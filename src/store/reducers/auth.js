const initialState = {
  loading: true,
  isSignedIn: false,
  uid: null,
  profile: {
    name: null,
    email: null
  }
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "set_auth_loading": {
      return {
        ...state,
        loading: true
      };
    }
    case "sign_in": {
      const { uid, name, email } = action.payload;
      return {
        loading: false,
        isSignedIn: true,
        uid,
        profile: { name, email }
      };
    }
    case "sign_out": {
      return {
        loading: false,
        isSignedIn: false,
        uid: null,
        profile: {
          name: null,
          email: null
        }
      };
    }
    default:
      return state;
  }
}
