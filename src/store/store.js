import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const persistConfig = {
  key: "moments_root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default createStore(persistedReducer, applyMiddleware(thunk));
