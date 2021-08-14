import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseContext } from "./Store/Context";
import Firebase from "./Firebase/Config";
import Context from "./Store/Context";

ReactDOM.render(
  <FirebaseContext.Provider value={{ Firebase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
