import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import "./Localization/i18nextConf";
import App from "./Components/Templates/App";
import Fallback from "./Components/Services/Fallback";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Fallback />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
