import React, { setGlobal } from "reactn";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { modelNames } from "./constants.js";

setGlobal({
  scalar: "Overall Score",
  region: { label: "Global - Land", value: "global" },
  hyperslabs: ["region", "metric", "scalar", "model"],
  rowsHyperslab: "metric",
  rowHyperslabDropdown: "scalar",
  columnsHyperslab: "model",
  columnHyperslabDropdown: "region",
  model: "bcc-csm1-1",
  metric: "Ecosystem and Carbon Cycle",
  tableHeaderValues: modelNames
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
