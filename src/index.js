import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Pomo from "./Pomo";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Pomo />, document.getElementById("root"));
registerServiceWorker();
