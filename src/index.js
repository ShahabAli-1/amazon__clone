import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import { StateProvider } from "./Components/api/StateProvider.js";
import reducer, { initialState } from "./Components/api/reducer.js";

const DisplayDiv = document.getElementById("root");

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  DisplayDiv
);
