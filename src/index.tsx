import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import App from "./Components/Templates/App";
import "./Localization/i18nextConf";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<h1>Processing...</h1>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
