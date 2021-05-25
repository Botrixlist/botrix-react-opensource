import React from "react";
import ReactDOM from "react-dom";
import "./css/index.scss";
import App from "./App";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import Restore from "./restore";
import allReducer from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Restore>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Restore>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
