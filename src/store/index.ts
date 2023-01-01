import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

const store = (initialState = {}) =>
  createStore(reducer, initialState, applyMiddleware(thunk));
export default store;
