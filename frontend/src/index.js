import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CurrentUserContext from "./components/reducers/userReducer";

// REMOVE NORMALIZE.CSS FROM MODULES

ReactDOM.render(
  <CurrentUserContext>
    <App />
  </CurrentUserContext>,
  document.getElementById("root")
);
