import { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
const Home = lazy(() => import("../Pages/Home"));
const Tracking = lazy(() => import("../Pages/Tracking"));

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/:code" component={Tracking} />
      </Switch>
    </Router>
  );
}

export default App;
