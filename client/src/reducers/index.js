import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  user: userReducer,
  errors: errorReducer,
  product: productReducer
});

export default rootReducer;
