import loggedReducer from "./isLogged";
import userReducer from "./user";
import notification from './notification';
import { combineReducers } from "redux";

const allReducers = combineReducers({
  logged: loggedReducer,
  user: userReducer,
  notification: notification
});

export default allReducers;
