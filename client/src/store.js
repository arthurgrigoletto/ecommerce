import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import multi from "redux-multi";
import rootReducer from "./reducers";

const middleware = [thunk, promise, multi];

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(...middleware));
}
