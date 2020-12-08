import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import App from "./App";
import CurrentUserContext from "./components/reducers/userReducer";

ReactDOM.render(
  <CurrentUserContext>
    <App />
  </CurrentUserContext>,
  document.getElementById("root")
);
